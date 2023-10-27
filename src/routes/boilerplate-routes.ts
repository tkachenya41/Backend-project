import Elysia from "elysia";
import { boilerplate } from "../controllers/boilerplateController";

export const boilerplateRoutes = (app: Elysia) =>
  app.group("/boilerplate", (group) =>
    group
      .get("/", boilerplate.get)
      .post("/", boilerplate.post)
      .put("/", boilerplate.put)
      .delete("/", boilerplate.delete)
  );
