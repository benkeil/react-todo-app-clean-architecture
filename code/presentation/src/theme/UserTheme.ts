export type ColorPair = {
  text: string;
  background: string;
};

export default interface UserTheme {
  color: {
    pairs: {
      /** app background, app text color */
      1: ColorPair;
      /** button */
      2: ColorPair;
    };
  };
}
