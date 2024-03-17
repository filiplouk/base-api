import express from "express";
import Auth from "../models/User/User.model.js";
const router = express.Router();
//Login
router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (req.session.isAuthenticated) {
            return res.redirect("/check");
        }
        const response = await Auth.loginUser({
            username: username,
            password: password,
        });
        if (!response.authenticated) {
            req.session.isAuthenticated = false;
            return res.status(401).json(response);
        }
        req.session.isAuthenticated = true;
        res.status(201).json(response);
    }
    catch (error) {
        next(error);
    }
});
//Register
router.post("/register", async (req, res, next) => {
    try {
        const { username, password, confirm, acceptTerms } = req.body;
        const response = await Auth.registerUser({
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
    }
    catch (error) {
        next(error);
    }
});
//Is Authenticated
router.get("/check", (req, res, next) => {
    try {
        if (!req.session.isAuthenticated) {
            const response = { authenticated: false };
            return res.status(400).json(response);
        }
        const response = { authenticated: true };
        return res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
});
export default router;
