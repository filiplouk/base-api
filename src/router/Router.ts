import express from "express";
const Router = express.Router();

import UserControllerClass from "../controllers/User/User.controller.js";
const UserController = new UserControllerClass();

//ROUTES
Router.post("/login", UserController.loginUser.bind(UserController));
Router.post("/register", UserController.registerUser.bind(UserController));
Router.post("/logout", UserController.logoutUser.bind(UserController));
Router.get("/check", UserController.checkUser.bind(UserController));

export default Router;
