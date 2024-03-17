import express, { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import mysqlSession from "express-mysql-session";
import csurf from "csurf";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler.js";
import Router from "./router/Router.js";
import { config, pool } from "./config/db.js";

const app = express();

//DOTENV
dotenv.config({ path: ".env" });
const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envFile });

//MIDDLEWARES
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

//EXPRESS SESSION

const MySQLStore = mysqlSession(session);

const sessionStore = new MySQLStore(config);

app.use(
  session({
    secret: String(process.env.SECRET),
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    //@ts-ignore
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

//ROUTES

app.use("/", Router);

//ERROR HANDLER
app.use(errorHandler);

//PORT
const port = process.env.PORT;
app.listen(process.env.PORT, function () {
  console.log(`Server started at port ${port}`);
});
