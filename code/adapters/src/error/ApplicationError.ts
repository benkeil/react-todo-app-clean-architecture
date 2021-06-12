import RuntimeError from '@trustedshops/etrusted-aaa-library-core/dist/error/RuntimeError';
import RuntimeErrorBuilder from '@trustedshops/etrusted-aaa-library-core/dist/error/RuntimeErrorBuilder';

export default class ApplicationError extends RuntimeError {
  constructor(builder: RuntimeErrorBuilder) {
    super(builder);
  }
}
