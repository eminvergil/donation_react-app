import React from "react";
import "./App.css";
import { store } from "./actions/store";
import { Provider } from "react-redux";
import DCanditates from "./components/DCanditates";
import { Container } from "@material-ui/core";

import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true}>
        <Container maxWidth="lg">
          <DCanditates />
        </Container>
      </ToastProvider>
    </Provider>
  );
}

export default App;
