import {ApolloProvider} from "@apollo/react-hooks";
import App from "@modules/App";
import React, {FunctionComponent} from "react";
import {BrowserRouter} from "react-router-dom";
import apolloClient from "./apolloClient";

const Root: FunctionComponent = () => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);

export default Root;
