
const app = new Elysia();

app.get("/", () => "Method get created!");

app.post("/post", () => "Method post created!");

app.put("/update", () => "Method put created!");

app.delete("/delete", () => "Method delete created!");

app.listen(3000);

