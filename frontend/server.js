import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { readFile, writeFile } from "fs/promises";


async function fetchProjects() {
  const data = await readFile("./assets/data.json", "utf-8");
  return JSON.parse(data);
}


const app = new Hono();

app.use("/*", cors());

app.use("/static/*", serveStatic({ root: "./" }));

app.get("/", async (c) => {
  const data = await readFile("./assets/data.json", "utf-8");
  const parsedData = JSON.parse(data);
  console.log(parsedData);
  
  return c.json(parsedData);
});

app.post("/", async (c) => {
  try {
    const data = await readFile("./assets/data.json", "utf-8");
    const parsedData = JSON.parse(data);
    const body = await c.req.json();

    if (!body.name || !body.description || !body.startDate || !body.endDate) {
      return c.json({ error: "Missing required fields" }, 400); 
    }

    parsedData.push(body);

    await writeFile("./assets/data.json", JSON.stringify(parsedData, null, 2));
    return c.json({ message: "Project added" }, 201);
  } catch (error) {
    console.error("Error while adding project:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }});



const port = 3000;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
