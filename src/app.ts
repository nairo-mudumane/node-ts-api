import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";

export class App {
  private express: express.Application;
  private port = process.env.PORT || (3333 as number);

  constructor() {
    this.express = express();
    this.listen();
    this.connectToDatabase();
  }

  public getApp(): express.Application {
    return this.express;
  }

  private listen(): void {
    this.express.listen(this.port, () =>
      console.log(`listening on: ${this.port}`)
    );
  }

  private connectToDatabase(): void {
    const uri =
      "mongodb+srv://root:<password>@cluster0.krg27ju.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });

    client.connect();
  }
}
