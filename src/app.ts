import express, { Application, NextFunction, Request, Response } from "express";
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

// no route error (404 Not Found)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// error handling middleware (for other types of errors)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// home route
app.get("/", (req: Request, res: Response) => {
  res.send("Hurrah! Ecommerce server is running...");
});

export default app;
