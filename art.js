// Original UI illustrations. Story artwork is stored locally under assets/stories.
const ink = '#0a2a66';
export function sceneArt(id) {
  return `<img class="scene-art" src="./assets/stories/${id}.png" alt="" width="960" height="640" decoding="async">`;
}
export function foliageArt() {
  return `<svg viewBox="0 0 1440 180" preserveAspectRatio="none" aria-hidden="true"><path d="M0 152Q201 133 391 150T738 145T1068 148T1440 144V180H0Z" fill="#57984e"/><g fill="#57984e"><path d="M50 159C-11 96 16 73 60 119C38 32 77 25 86 109C116 49 142 71 104 134L126 161Z"/><path d="M309 163C256 107 274 90 311 124C285 45 319 28 339 113C353 56 380 74 359 133C406 98 412 135 376 160Z"/><path d="M1180 160C1120 110 1141 92 1177 124C1150 51 1185 32 1202 114C1229 47 1260 71 1228 135C1289 92 1300 126 1259 163Z"/><path d="M1380 160C1320 107 1328 83 1380 119C1346 37 1387 27 1402 109C1434 54 1458 77 1425 144L1440 160Z"/></g><g fill="#8ebb59"><path d="M163 169C109 111 126 95 171 143C146 68 177 60 191 135C229 87 251 110 209 159Z"/><path d="M1033 167C989 115 1002 102 1035 139C1012 73 1042 66 1055 135C1087 93 1105 114 1073 159Z"/></g></svg>`;
}
export function emotionFace(label) {
  const colors = { '开心': '#ffdc6c', '紧张': '#d8cdf8', '难过': '#b6dff6', '生气': '#ffa79b', '失望': '#c9e1b2', '不知道': '#ffe4af' };
  const mouths = {
    '开心': '<path d="M29 48q19 25 38 0Z" fill="#89533f"/><path d="M38 61q10-8 20 0" stroke="#f2a398" stroke-width="5"/>',
    '紧张': '<path d="M29 60l8-4 8 4 8-4 8 4" fill="none"/><path d="M21 31l12-5m30 0 12 5" fill="none"/>',
    '难过': '<path d="M33 65q15-18 30 0M23 29l12-5m27 0 12 5" fill="none"/><path d="M73 45q-12 18 0 18q12 0 0-18" fill="#66bbdf" stroke-width="2"/>',
    '生气': '<path d="M32 65q16-16 32 0M22 25l15 8m22 0 15-8" fill="none"/>',
    '失望': '<path d="M34 62h28M23 30l13-5m24 0 13 5" fill="none"/>',
    '不知道': '<ellipse cx="48" cy="61" rx="7" ry="8" fill="#89533f"/><path d="M22 27q7-8 14 0m24-1h13" fill="none"/>',
  };
  return `<svg viewBox="0 0 96 96" class="emotion-face" aria-hidden="true"><circle cx="48" cy="48" r="42" fill="${colors[label]}" stroke="none"/><g stroke="${ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="32" cy="42" rx="3.5" ry="5" fill="${ink}" stroke="none"/><ellipse cx="64" cy="42" rx="3.5" ry="5" fill="${ink}" stroke="none"/>${mouths[label]}</g><ellipse cx="20" cy="52" rx="6" ry="4" fill="#ef9c8d" opacity=".65"/><ellipse cx="76" cy="52" rx="6" ry="4" fill="#ef9c8d" opacity=".65"/></svg>`;
}
