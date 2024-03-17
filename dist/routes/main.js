import express from "express";
import { pool } from "../config/db.js";
const router = express.Router();
router.get("/", (req, res, next) => {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to the database:", err);
                return;
            }
            console.log("Connected to the database!");
        });
        if (req.session.views) {
            req.session.views++;
            req.session.save();
        }
        else {
            req.session.views = 2;
        }
        res.send(req.session);
    }
    catch (error) {
        next();
    }
});
export default router;
