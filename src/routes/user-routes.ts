import Elysia from "elysia";
import { user } from "../controllers/userController";
import { Body } from "../utils/utils";

export const userRoutes = (app: Elysia) =>
  app.group("/users", (group) =>
    group
      .get("/:id", ({ params: { id } }) => user.getById(Number(id)))
      .get("/", user.getAll)
      .post("/", ({ body }) => user.post(body as Body))
      .put("/", ({ body }) => user.put(body as Body))
      .delete("/", ({ body }) => user.delete(body as Body))
  );
