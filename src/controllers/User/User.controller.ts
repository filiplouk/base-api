import { NextFunction, Request, Response } from "express";
import Auth from "../../models/User/User.model.js";
import {
  AuthenticateRes,
  LoginUser,
  RegisterUser,
} from "../../types/User/User.dto.js";

class UserController {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, confirm, acceptTerms }: RegisterUser =
        req.body;

      const response: AuthenticateRes = await Auth.registerUser({
        username: username,
        password: password,
        confirm: confirm,
        acceptTerms: acceptTerms,
      });

      if (!response.authenticated) {
        req.session.isAuthenticated = false;
        return res.status(401).json(response);
      }
      req.session.isAuthenticated = true;
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password }: LoginUser = req.body;

      if (req.session.isAuthenticated) {
        return res.redirect("/check");
      }

      const response: AuthenticateRes = await Auth.loginUser({
        username: username,
        password: password,
      });

      if (!response.authenticated) {
        req.session.isAuthenticated = false;
        return res.status(401).json(response);
      }
      req.session.isAuthenticated = true;
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async checkUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.session.isAuthenticated) {
        const response: AuthenticateRes = { authenticated: false };
        return res.status(400).json(response);
      }
      const response: AuthenticateRes = { authenticated: true };
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
      req.session.destroy(() => {
        const response: AuthenticateRes = {
          authenticated: true,
          message: "You have succesfully logged out.",
        };
        return res.status(200).json(response);
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
