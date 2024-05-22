import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductsRoutes } from "./app/modules/products/products.route";
import { OrdersRoutes } from "./app/modules/Orders/orders.route";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// api routes
app.use("/api", ProductsRoutes);
app.use("/api", OrdersRoutes);

// home route
app.get("/", (req: Request, res: Response) => {
  res.send("Hurrah! Ecommerce server is running...");
});

export default app;
