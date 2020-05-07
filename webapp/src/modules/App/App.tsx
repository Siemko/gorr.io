import React, {Suspense} from "react";
import {Switch} from "react-router";
import AppRoute from "./AppRoute";
import GlobalStyle from "./GlobalStyles";
import routes from "./routes";

const routeComponents = routes.map((route, index) => (
  <AppRoute key={index} {...route} />
));

const App = () => (
  <>
    <GlobalStyle />
    <Suspense fallback={"Loading..."}>
      <Switch>{routeComponents}</Switch>
    </Suspense>
  </>
);

export default App;
