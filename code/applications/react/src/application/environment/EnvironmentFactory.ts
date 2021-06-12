import Environment from './Environment';
import localEnvironment from './environment.local';
import developmentEnvironment from './environment.development';
import productionEnvironment from './environment.production';
import testEnvironment from './environment.test';
import functionalTestsEnvironment from './environment.functional-tests';
import Stage from './Stage';
import ApplicationError from '../error/ApplicationError';
import ErrorType from '../error/ErrorType';

export default class EnvironmentFactory {
  private mapping = new Map<Stage, Environment>([
    [Stage.LOCAL, localEnvironment],
    [Stage.FUNCTIONAL_TESTS, functionalTestsEnvironment],
    [Stage.DEVELOPMENT, developmentEnvironment],
    [Stage.TEST, testEnvironment],
    [Stage.PRODUCTION, productionEnvironment],
  ]);

  constructor(private stage: Stage) {}

  public getEnvironment(): Environment {
    const environment = this.mapping.get(this.stage);
    if (!environment) {
      throw new ApplicationError({
        message: `Environment for stage ${this.stage} not found.`,
        type: ErrorType.ENVIRONMENT_NOT_FOUND,
      });
    }
    return environment;
  }
}
