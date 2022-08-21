import express from "express";
import cors from "cors";
import mongoose from "mongoose";

export class App {
  private express: express.Application;
  private port = process.env.PORT || (3333 as number);

  constructor() {
    this.express = express();
    this.listen();
  }

  public getApp(): express.Application {
    return this.express;
  }

  private listen(): void {
    this.express.listen(this.port, () =>
      console.log(`listening on: ${this.port}`)
    );
  }
}
