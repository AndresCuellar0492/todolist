export const randomId = (): string =>
  Date.now() + Math.floor(Math.random() * 1000).toString();
