import * as express from "express";
import { RouteType, Utils } from "../common";
import { UserController } from "./user-controller";

const router = express.Router();

router.post(
  Utils.getRoutePrefix(RouteType.public, "/authenticate"),
  UserController.authenticate
);

router.post(
  Utils.getRoutePrefix(RouteType.public, "/register"),
  UserController.register
);

export const userRoutes = router;
