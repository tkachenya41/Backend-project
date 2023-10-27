import Elysia from "elysia";
import { user } from "../controllers/userController";

export const userRoutes = (app: Elysia) =>
  app.group("/users", (group) =>
    group
      .get("/", user.getAllUsers)
      .post("/", user.postUser)
      .put("/", user.putUser)
      .delete("/", user.deleteUser)
  );
