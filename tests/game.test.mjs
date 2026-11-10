import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { stories, createState, select, move, reset } from '../game.js';

test('every story ships a valid local PNG illustration', async () => {
  for (const story of stories) {
    const image = await readFile(new URL(`../assets/stories/${story.id}.png`, import.meta.url));
    assert.deepEqual([...image.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  }
});

test('three complete stories include actionable feedback and theory', () => {
  assert.equal(stories.length, 3);
  assert.equal(new Set(stories.map(s => s.id)).size, 3);
  for (const s of stories) {
    for (const key of ['id', 'title', 'scene', 'thought', 'known', 'unknown', 'practice', 'parent', 'theory']) assert.ok(s[key]);
    assert.ok(s.actions.length >= 3);
    assert.ok(s.actions.every(a => a.label && a.feedback));
  }
  assert.match(stories[0].actions.map(a => a.feedback).join(''), /拒绝|不愿意/);
  assert.match(stories[0].parent, /欺负|嘲笑/);
  assert.match(stories[1].parent, /伤/);
});
test('unknown is exclusive, concrete emotions can coexist and toggle off', () => {
  let s = createState('fox');
  select(s, 'emotions', '紧张'); select(s, 'emotions', '难过');
  assert.deepEqual(s.emotions, ['紧张', '难过']);
  select(s, 'emotions', '不知道'); assert.deepEqual(s.emotions, ['不知道']);
  select(s, 'emotions', '紧张'); assert.deepEqual(s.emotions, ['紧张']);
  select(s, 'emotions', '紧张'); assert.deepEqual(s.emotions, []);
});
test('body alternatives are exclusive and skips clear previous answers', () => {
  const s = createState('fox');
  select(s, 'body', '心跳变快'); select(s, 'body', '没有这些感觉');
  assert.deepEqual(s.body, ['没有这些感觉']);
  select(s, 'body', '不知道'); assert.deepEqual(s.body, ['不知道']);
  move(s, 1); select(s, 'emotions', '紧张'); move(s, 1, true);
  assert.deepEqual(s.emotions, []); assert.equal(s.step, 2);
});
test('back preserves answers, boundaries hold, reset clears all story data', () => {
  const s = createState('fox');
  move(s, -1); assert.equal(s.step, 0);
  move(s, 1); select(s, 'emotions', '紧张'); move(s, 1); move(s, -1);
  assert.deepEqual(s.emotions, ['紧张']);
  for (let i = 0; i < 10; i++) move(s, 1);
  assert.equal(s.step, 5);
  reset(s, 'bear'); assert.deepEqual(s, createState('bear'));
  reset(s); assert.equal(s.storyId, null); assert.equal(s.step, 0);
});
