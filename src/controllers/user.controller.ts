import { Request, Response } from "express";
import { UserModel } from "../models";

export class UserController {
  public async setUser(
    request: Request,
    response: Response
  ): Promise<Response> {
    const payload = request.body;

    try {
      await UserModel.create(payload).then((records) => {
        console.log(records);
      });
    } catch (error: any) {
      return response.status(500).json({ error: true, message: error.message });
    }

    return response
      .status(201)
      .json({ error: false, message: "created", data: {} });
  }
}
