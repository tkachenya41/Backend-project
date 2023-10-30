import Elysia from "elysia";
import { userRoutes } from "./user-routes";

export const routes = (app: Elysia) => {
  app.use(userRoutes);
};
