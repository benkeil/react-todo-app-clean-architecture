import React from 'react';
import ReactDOM from 'react-dom';
import App from './application/App';
import reportWebVitals from './application/debug/reportWebVitals';
import ApplicationConfigurationServiceImpl from './application/configuration/ApplicationConfigurationServiceImpl';

const mountPoint = document.getElementById('todo-app')!;
const configurationService = new ApplicationConfigurationServiceImpl(mountPoint);
const dynamicConfiguration$ = configurationService.getDynamicApplicationConfiguration();
const staticConfiguration = configurationService.getStaticApplicationConfiguration();
configurationService.readApplicationConfiguration();
ReactDOM.render(
  React.createElement(App, {
    dynamicConfiguration$,
    staticConfiguration,
  }),
  mountPoint,
);
const mutationObserver = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type == 'attributes') {
      configurationService.readApplicationConfiguration();
    }
  });
});
mutationObserver.observe(mountPoint, { attributes: true, attributeFilter: ['locale', 'theme'] });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
