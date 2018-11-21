import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { configureStore } from "./store";
import { createDictionary } from "./models";

import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const dict = createDictionary("Colors");
dict.entries.set("Anthracite", "Dark Grey");
dict.entries.set("Midnight Black", "Black");
dict.entries.set("Mystic Silver", "Silver");

const store = configureStore({ dictionaries: [dict] });

ReactDOM.render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
  </div>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
