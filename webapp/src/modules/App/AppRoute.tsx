import {APP_NAME} from "@config/appSettings";
import React, {FunctionComponent, lazy, useCallback} from "react";
import {Route} from "react-router";
import {RouteConfig} from "./routes";

const AppRoute: FunctionComponent<RouteConfig> = ({
  title: routeTitle,
  component,
  lazyComponent,
  exact,
  path,
}) => {
  const Component = component || lazy(lazyComponent!);

  const onMount = useCallback(() => {
    let newTitle = APP_NAME;
    if (routeTitle) {
      newTitle += ` • ${routeTitle}`;
    }
    document.title = newTitle;
  }, [routeTitle]);

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        onMount();
        return <Component />;
      }}
    />
  );
};

export default AppRoute;
