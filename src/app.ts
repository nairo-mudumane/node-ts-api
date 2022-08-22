import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import { notFoundRoutes, userRoutes } from "./routes";

export class App {
  private app: express.Application;
  private port = process.env.PORT || (3333 as number);

  constructor() {
    this.app = express();
    this.defaultMiddleware();
    this.connectToDataBase();
    this.routes();
    this.listen();
  }

  private listen(): void {
    this.app.listen(this.port, () => console.log(`listening on: ${this.port}`));
  }

  private defaultMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors);
  }

  private routes(): void {
    this.app.use("*", notFoundRoutes);
    this.app.use("/v1/users", userRoutes);
  }

  private async connectToDataBase(): Promise<void> {
    const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster1.pli5ivq.mongodb.net/chatapp?retryWrites=true&w=majority`;

    try {
      return await mongoose
        .connect(uri)
        .then(() => console.log("connected to database"));
    } catch (error) {
      console.log("database connection error:");
      console.log(error);
      return;
    }
  }

  public getApp(): express.Application {
    return this.app;
  }
}
