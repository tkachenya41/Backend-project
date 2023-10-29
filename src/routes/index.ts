import Elysia from "elysia";
import { boilerplateRoutes } from "./boilerplate-routes";
import { userRoutes } from "./user-routes";

export const routes = (app: Elysia) => {
  app.use(boilerplateRoutes);
  app.use(userRoutes);
};
