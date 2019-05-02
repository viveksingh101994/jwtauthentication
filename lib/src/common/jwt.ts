import * as config from "config";
import * as fs from "fs";
import * as jsonwebtoken from "jsonwebtoken";
import * as uuid from "uuid";

class Jwt {
  public static getInstance(): Jwt {
    return new Jwt();
  }
  private privateKey: any;

  public hasPrivateKey(): boolean {
    return this.privateKey !== undefined;
  }

  public generateJwtForUser(claims: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const iat = Math.floor(Date.now() / 1000);
      claims.exp =
        iat +
        parseInt(config.get("JWT.EXPIRE_PERIOD_IN_SECONDS").toString(), 10);
      claims.iat = iat;
      claims.jti = uuid.v4();
      claims.iss = config.get("JWT.ISSUER").toString();
      this.privateKey = fs.readFileSync("./private-key.pem");
      jsonwebtoken.sign(
        claims,
        this.privateKey,
        { algorithm: "RS256" },
        (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    });
  }
}

export const jwt = Jwt.getInstance();
