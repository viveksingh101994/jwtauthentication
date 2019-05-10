import * as mongoose from "mongoose";

export class DB {
  public static async init() {
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

  private static user: string;
  private static dbname: string;
  private static password: string;
  private static server: string;

  private static setConfiguration() {
    if (process.env.NODE_ENV === "local") {
      this.dbname = process.env.DB_NAME;
    } else {
      this.user = process.env.DB_USER;
      this.dbname = process.env.DB_NAME;
      this.password = process.env.DB_PASSWORD;
      this.server = process.env.DB_SERVER;
    }
  }

  private static getConnectionString() {
    if (process.env.NODE_ENV === "local") {
      return `mongodb://127.0.0.1:27017/${this.dbname}`;
    } else {
      return `mongodb://${this.user}:${this.password}@${this.server}/${
        this.dbname
      }`;
    }
  }
}
