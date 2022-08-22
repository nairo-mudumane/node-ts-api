import { Request, Response } from "express";
import { UserModel } from "../models";

class UserController {
  public async setUser(
    request: Request,
    response: Response
  ): Promise<Response> {
    const payload = request.body;

    try {
      console.log("creating user");
      const user = await UserModel.create(payload).then((records) => {
        console.log("user created:");
        console.log(records);
        return records;
      });
      return response
        .status(201)
        .json({ error: false, message: "created", data: user });
    } catch (error: any) {
      return response.status(500).json({ error: true, message: error.message });
    } finally {
      console.log("finished");
    }
  }
}

export default new UserController();
