import { Observable, PartialObserver } from 'rxjs';
import { first } from 'rxjs/operators';

const renderViewOnce = <T>(observable: Observable<T>, observer: PartialObserver<T>): void => {
  observable.pipe(first()).subscribe(observer);
};

export default renderViewOnce;
