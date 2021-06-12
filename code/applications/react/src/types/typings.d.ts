declare module '*.svg' {
  const value: any;
  export default value;
}

declare module '*.scss' {
  const contents: { default: string };
  export = contents;
}
