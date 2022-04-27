import * as React from 'react';
import ReactDOM from 'react-dom';
import { AllUniversalContext } from './components';

if (typeof window !== "undefined") {
  ReactDOM.render(
    <React.Fragment>
      <AllUniversalContext />
    </React.Fragment>,
    document.getElementById('root'),
  );
}