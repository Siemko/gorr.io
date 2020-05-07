import {RequireOnlyOne} from "@common/RequireOnlyOne";
import routesPaths from "@config/routesPaths";
import React, {FunctionComponent} from "react";

export type RouteConfig = {
  path?: string;
  title?: string;
  exact: boolean;
} & RequireOnlyOne<{
  component: FunctionComponent;
  lazyComponent: () => Promise<{default: FunctionComponent}>;
}>;

const routes: RouteConfig[] = [
  {
    path: routesPaths.HOMEPAGE,
    exact: true,
    lazyComponent: () => import("@modules/Homepage"),
  },
  {
    exact: false,
    component: () => <>Not found</>,
  },
];

export default routes;
