import {ApolloProvider} from "@apollo/react-hooks";
import App from "@modules/App";
import React, {FunctionComponent} from "react";
import apolloClient from "./apolloClient";

const Root: FunctionComponent = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  );
};

export default Root;
