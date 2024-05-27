import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { ProductsRoutes } from "./app/modules/products/products.route";
import { OrdersRoutes } from "./app/modules/Orders/orders.route";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// home route
app.get("/", (req: Request, res: Response) => {
  res.send("Hurrah! Ecommerce server is running...");
});

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
  console.error("Error occurred:", err);

  // Set a default status code (500 Internal Server Error)
  const statusCode = err.statusCode || 500;

  // Send an error response to the client
  res.status(statusCode).json({
    success: false,
    message: err.message || "An error occurred. Please try again later.",
    error: err.message,
  });
});

export default app;
