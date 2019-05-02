import App from "./app";
import { routes } from "./routing";

const app = new App([routes], process.env.PORT || "3000");

app.listen();
