import express from "express";
import cors from "cors";
import firebase from "firebase-admin";
import { SERVICE_ACCOUNT } from "../config";
import "dotenv/config";

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
  }

  private connectToDataBase() {
    firebase.initializeApp({
      // @ts-ignore
      credential: firebase.credential.cert(SERVICE_ACCOUNT),
      databaseURL: "https://node-ts-api.firebaseio.com/",
      projectId: "node-ts-api",
      storageBucket: "gs://node-ts-api.appspot.com",
    });
  }

  public getApp(): express.Application {
    return this.express;
  }

  public firestore() {
    const firestore = firebase.firestore();
    return firestore;
  }

  public storage() {
    const storage = firebase.storage().bucket();
    return storage;
  }

  public realtime() {
    const realtime = firebase.app().database();
    return realtime;
  }
}
