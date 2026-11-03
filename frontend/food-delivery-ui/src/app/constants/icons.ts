// export const Icons = {
//     eyeopen: `<svg
//   xmlns="http://www.w3.org/2000/svg"
//   width="24"
//   height="24"
//   viewBox="0 0 24 24"
//   fill="none"
//   stroke="#77736D"
//   stroke-width="2"
//   stroke-linecap="round"
//   stroke-linejoin="round">

//   <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />

//   <circle cx="12" cy="12" r="3" />

// </svg>`,

//     eyeclose: `<svg
//   xmlns="http://www.w3.org/2000/svg"
//   width="24"
//   height="24"
//   viewBox="0 0 24 24"
//   fill="none"
//   stroke="#77736D"
//   stroke-width="2"
//   stroke-linecap="round"
//   stroke-linejoin="round">

//   <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />

//   <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c5 0 8.27 4.11 9 7-.27 1.09-.84 2.29-1.69 3.35" />

//   <path d="M6.61 6.61C4.91 7.84 3.65 9.58 3 12c.73 2.89 4 7 9 7a10.5 10.5 0 0 0 4.39-.94" />

//   <line x1="3" y1="3" x2="21" y2="21" />

// </svg>`
// }
export const ICONS = {
  EYE: {
    viewBox: '0 0 24 24',
    path: 'M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0',
    circle: {
      cx: '12',
      cy: '12',
      r: '3'
    }
  },

  EYE_OFF: {
    viewBox: '0 0 24 24',
    paths: [
      'M9.88 9.88a3 3 0 1 0 4.24 4.24',
      'M10.73 5.08A10.43 10.43 0 0 1 12 5c5 0 8.27 4.11 9 7-.27 1.09-.84 2.29-1.69 3.35',
      'M6.61 6.61C4.91 7.84 3.65 9.58 3 12c.73 2.89 4 7 9 7a10.5 10.5 0 0 0 4.39-.94'
    ],
    line: {
      x1: '3',
      y1: '3',
      x2: '21',
      y2: '21'
    }
  }
} as const;