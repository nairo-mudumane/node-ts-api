import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./routes";

export class App {
  private express: express.Application;
  private port = process.env.PORT || (3333 as number);

  constructor() {
    this.express = express();
    this.listen();
    this.defaultMiddleware();
    this.connectToDataBase();
  }

  private listen(): void {
    this.express.listen(this.port, () =>
      console.log(`listening on: ${this.port}`)
    );
  }

  private defaultMiddleware(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(cors);
    this.express.use(routes);
  }

  private async connectToDataBase(): Promise<void> {
    const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster1.pli5ivq.mongodb.net/?retryWrites=true&w=majority`;

    try {
      mongoose.connect(uri);
    } catch (error) {
      console.log("database connection error:");
      console.log(error);
    }
  }

  public getApp(): express.Application {
    return this.express;
  }
}
