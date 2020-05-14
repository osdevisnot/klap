export const sum = (a, b) => {
  if (__DEV__) {
    console.log('this console log should not end up in dist code');
  }
  return a + b;
};
