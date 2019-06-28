import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import { Response, Utils } from "./common";
import { DB } from "./database";

class App {
  public app: express.Application;
  public port: number;

  constructor(routes, port) {
    this.app = express();
    this.port = port;
    this.initializeDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(routes);
    this.initializeErrorHandler();
    this.initializeResponseHandler();
  }
  public listen() {
    this.app.listen(this.port, () => {
      // tslint:disable-next-line:no-console
      console.log(`App listening on the port ${this.port}`);
    });
  }
  private initializeDatabase() {
    DB.init();
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(this.loggerMiddleware);
    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: false
      })
    );
    this.app.use(cookieParser());
  }

  private initializeControllers(routes) {
    routes.forEach(route => {
      this.app.use(route);
    });
  }

  private loggerMiddleware(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    // tslint:disable-next-line:no-console
    console.log(`${request.method} ${request.path}`);
    next();
  }

  private initializeErrorHandler() {
    this.app.use((errObj, req, res, next) => {
      let errorResp = errObj;
      if (errObj instanceof Error) {
        errorResp = Utils.copyObj(Response.ServerError());
        errorResp.err = errObj;
      }
      next(errorResp);
    });
  }

  private initializeResponseHandler() {
    this.app.use((resData, req, res, next) => {
      if (resData.status === 200) {
        res.send(resData.message);
      } else if (resData.status === 302) {
        res.redirect(resData.message.url);
      } else {
        res.status(resData.status);
        res.json(resData.message);
      }
    });
  }
}

export default App;
