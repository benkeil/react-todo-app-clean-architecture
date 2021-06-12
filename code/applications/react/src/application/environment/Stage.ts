enum Stage {
  LOCAL = 'local',
  DEVELOPMENT = 'development',
  TEST = 'test',
  PRODUCTION = 'production',
  FUNCTIONAL_TESTS = 'functional-tests',
}

const stageFromString = (value: string | null | undefined): Stage => {
  switch (value) {
    case Stage.LOCAL:
      return Stage.LOCAL;
    case Stage.FUNCTIONAL_TESTS:
      return Stage.FUNCTIONAL_TESTS;
    case Stage.DEVELOPMENT:
      return Stage.DEVELOPMENT;
    case Stage.TEST:
      return Stage.TEST;
    case Stage.PRODUCTION:
      return Stage.PRODUCTION;
    case null:
    case undefined:
    default:
      return Stage.PRODUCTION;
  }
};

export default Stage;

export { stageFromString };
