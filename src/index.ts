import { Elysia } from "elysia";
import { routes } from "./routes/index";

const app = new Elysia();

app.use(routes).listen(3000);

export default app;
