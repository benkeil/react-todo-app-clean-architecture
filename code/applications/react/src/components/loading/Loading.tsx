import React, { FunctionComponent } from 'react';
import LoadingPresenter from '@project/presentation/src/loading/LoadingPresenter';
import { Optional } from 'typescript-optional';
import LoadingView from '@project/presentation/src/loading/LoadingView';
import useObservableEffect from '../../hooks/useObservableEffect';
import useEmptyOptionalView from '../../hooks/useEmptyOptionalView';
import useApplicationContext from '../../hooks/useApplicationContext';

const Loading: FunctionComponent = () => {
  const { localizationService } = useApplicationContext();
  const [optionalView, setOptionalView] = useEmptyOptionalView<LoadingView>();
  const presenter = new LoadingPresenter(localizationService);

  useObservableEffect(presenter.setResult(), {
    next: (view) => setOptionalView(Optional.of(view)),
  });

  return (
    <div>
      {optionalView.matches({
        empty: () => <></>,
        present: (view) => <h2>{view.text}</h2>,
      })}
    </div>
  );
};

export default Loading;
