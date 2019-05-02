import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import { Response, Utils } from "./common";
import { DB } from "./database";

const app = express();
const initializeDB = new DB();
initializeDB.init();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());

app.use("/", (req, res, next) => {
  res.send("Powered by Express");
});

// catch 404 and forward to error handler
app.use((errObj, req, res, next) => {
  let errorResp = errObj;
  if (errObj instanceof Error) {
    errorResp = Utils.copyObj(Response.ServerError());
    errorResp.err = errObj;
  }
  next(errorResp);
});

app.use((resData, req, res, next) => {
  if (resData.status === 200) {
    res.send(resData.message);
  } else if (resData.status === 302) {
    res.redirect(resData.message.url);
  } else {
    res.status(resData.status);
    res.json(resData.message);
  }
});

module.exports = app;
