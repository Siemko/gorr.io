import {ApolloProvider} from "@apollo/react-hooks";
import App from "@modules/App";
import React, {FunctionComponent} from "react";
import apolloClient from "./apolloClient";

const Root: FunctionComponent = () => (
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>
);

export default Root;
