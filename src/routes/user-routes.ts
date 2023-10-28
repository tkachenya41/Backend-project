import Elysia from "elysia";
import { user } from "../controllers/userController";
import { Body, Set } from "../utils/utils";

export const userRoutes = (app: Elysia) =>
  app.group("/users", (group) =>
    group
      .get("/:id", ({ params: { id }, set }) =>
        user.getById(Number(id), set as Set)
      )
      .get("/", user.getAll)
      .post("/", ({ body, set }) => user.post(body as Body, set as Set))
      .put("/", ({ body, set }) => user.put(body as Body, set as Set))
      .delete("/", ({ body, set }) => user.delete(body as Body, set as Set))
  );
