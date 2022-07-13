import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom/client";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { AllUniversalContext } from './components';

const history = createBrowserHistory({ window });

// if (typeof window !== "undefined") {
const container = document.getElementById('root');

// const root = createRoot(container!);

// root.render();

ReactDOM.createRoot(container!).render(
  <HistoryRouter history={history}>
    <AllUniversalContext />
  </HistoryRouter>
);
// }

