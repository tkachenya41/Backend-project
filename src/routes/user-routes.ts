import Elysia, { t } from "elysia";
import { user } from "@/controllers/userController";
import { Response } from "@/utils/utils";

const userBodyCheck = {
  body: t.Object({
    id: t.Number(),
    name: t.String(),
    email: t.String(),
    password: t.String(),
  }),
};

export const userRoutes = (app: Elysia) =>
  app.group("/users", (group) =>
    group
      .get("/:id", ({ params: { id }, set }) =>
        user.getById(Number(id), set as Response)
      )
      .get("/", user.getAll)
      .post(
        "/",
        ({ body, set }) => user.post(body, set as Response),
        userBodyCheck
      )
      .put(
        "/",
        ({ body, set }) => user.put(body, set as Response),
        userBodyCheck
      )
      .delete(
        "/",
        ({ body, set }) => user.delete(body, set as Response),
        userBodyCheck
      )
  );
