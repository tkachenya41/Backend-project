import { Elysia } from "elysia";
import { deleteInfo, getInfo, postInfo, updateInfo } from "./routes/routes";

const app = new Elysia();

app.get("/boilerplate", getInfo);

app.post("/boilerplate", postInfo);

app.put("/boilerplate", updateInfo);

app.delete("/boilerplate", deleteInfo);

app.listen(3000);
