import React from 'react';
import ReactDOM from 'react-dom';
import App from './application/App';
import reportWebVitals from './application/debug/reportWebVitals';
import ApplicationConfigurationServiceImpl from './application/configuration/ApplicationConfigurationServiceImpl';

class TodoApp extends HTMLElement {
  configurationService: ApplicationConfigurationServiceImpl;

  constructor() {
    super();
    this.configurationService = new ApplicationConfigurationServiceImpl(this);
  }

  async connectedCallback(): Promise<void> {
    const dynamicConfiguration$ = this.configurationService.getDynamicApplicationConfiguration();
    const staticConfiguration = this.configurationService.getStaticApplicationConfiguration();
    // const mountPoint = this.attachShadow({ mode: 'open' });
    const mountPoint = this;
    this.configurationService.readApplicationConfiguration();
    ReactDOM.render(
      React.createElement(App, {
        dynamicConfiguration$,
        staticConfiguration,
      }),
      mountPoint,
    );
  }

  static get observedAttributes(): string[] {
    return ['locale', 'stage'];
  }

  attributeChangedCallback(_name: string, _oldValue: string, _newValue: string): void {
    this.configurationService.readApplicationConfiguration();
  }
}

customElements.define('todo-app', TodoApp);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
