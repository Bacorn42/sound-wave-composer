export const A4 = 440;
export const AS4 = A4 * (2**(1/12));
export const B4 = A4 * (2**(2/12));
export const C5 = A4 * (2**(3/12));
export const CS5 = A4 * (2**(4/12));
export const D5 = A4 * (2**(5/12));
export const DS5 = A4 * (2**(6/12));
export const E5 = A4 * (2**(7/12));
export const F5 = A4 * (2**(8/12));
export const FS5 = A4 * (2**(9/12));
export const G5 = A4 * (2**(10/12));
export const GS5 = A4 * (2**(11/12));

export const toneArray = [A4, AS4, B4, C5, CS5, D5, DS5, E5, F5, FS5, G5, GS5].reverse();
export const toneNames = ['A4', 'A♯4', 'B4', 'C5', 'C♯5', 'D5', 'D♯5', 'E5', 'F5', 'F♯5', 'G5', 'G♯5'].reverse();