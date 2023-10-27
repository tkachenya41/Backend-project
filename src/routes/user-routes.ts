import Elysia from "elysia";
import { user } from "../controllers/userController";

export const userRoutes = (app: Elysia) =>
  app.group("/users", (group) =>
    group
      .get("/:id", ({ params: { id } }) => user.getById(Number(id)))
      .get("/", user.getAll)
      .post("/", user.post)
      .put("/", user.put)
      .delete("/", user.delete)
  );
