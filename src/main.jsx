import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from '@react-oauth/google';
import "./index.css";
import { persistor, store } from "./Redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="150250688028-3q3h69aphbc5q7i82f4n6if7or9d3c2d.apps.googleusercontent.com">
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App />
    </PersistGate>
  </Provider>
  </GoogleOAuthProvider>
);
