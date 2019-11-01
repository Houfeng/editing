export const test = (keyword: string) =>
  navigator.userAgent.indexOf(keyword) > -1;

export const isSafari = test("Safari") && !test("Chrome") && !test("Opera");
export const isFirefox = test("Firefox") && test("Gecko");
export const isChrome = test("Chrome");
export const isIE = test("MSIE");
