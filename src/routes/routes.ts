import Elysia from "elysia";
import { boilerplate } from "../boilerplate";

export const routes = (app: Elysia) =>
  app.group("/boilerplate", (group) =>
    group
      .get("/", boilerplate.get)
      .post("/", boilerplate.post)
      .put("/", boilerplate.put)
      .delete("/", boilerplate.delete)
      .listen(3000)
  );
