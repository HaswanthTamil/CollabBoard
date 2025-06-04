import { Hono } from "hono";

const authenticationRoutes = new Hono().basePath("/auth");

authenticationRoutes.post("/login", (c) => {
  return c.text("Route not implemented.");
});

authenticationRoutes.post("/refresh", (c) => {
  return c.text("Route not implemented.");
});

export default authenticationRoutes;
