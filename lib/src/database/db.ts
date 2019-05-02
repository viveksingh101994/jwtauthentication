import * as config from "config";
import * as mongoose from "mongoose";

export class DB {
  private user: string;
  private name: string;
  private password: string;
  private server: string;

  public async init() {
    this.setConfiguration();
    const connectionUri = this.getConnectionString();
    try {
      await mongoose.connect(connectionUri, {
        useNewUrlParser: true
      });
      // tslint:disable-next-line:no-console
      console.log("Database Connected =>", connectionUri);
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.log("Connection Error=>", err);
      process.exit(1);
    }
  }
  private setConfiguration() {
    this.user = process.env.DB_USER || config.get("DB.USER");
    this.name = process.env.DB_NAME || config.get("DB.NAME");
    this.password = process.env.DB_PASSWORD || config.get("DB.PASSWORD");
    this.server = process.env.DB_SERVER || config.get("DB.SERVER");
  }

  private getConnectionString() {
    if (process.env.NODE_ENV === "local") {
      return `mongodb://127.0.0.1:27017/${this.name}`;
    } else {
      return `mongodb://${this.user}:${this.password}@${this.server}/${
        this.name
      }`;
    }
  }
}
