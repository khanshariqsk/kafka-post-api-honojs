import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import kafkaConfig from "../config/kafka.config";

const app = new Hono();

app.post(
  "/create-post",
  zValidator(
    "json",
    z.object({
      title: z.string(),
      content: z.string(),
    })
  ),
  async (c) => {
    const { title, content } = c.req.valid("json");

    try {
      await kafkaConfig.sentToTopic("post", JSON.stringify({ title, content }));
      return c.json({ message: "Post Created" }, 201);
    } catch (error) {
      return c.json({ error: "Error sending mesage" }, 500);
    }
  }
);

export default app;
