import * as jsonwebtoken from "jsonwebtoken";
import * as uuid from "uuid";

class Jwt {
  public static getInstance(): Jwt {
    return new Jwt();
  }

  public generateJwtForUser(claims: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const iat = Math.floor(Date.now() / 1000);
      claims.exp = iat + parseInt(process.env.JWT_EXPIRE_PERIOD_IN_SECONDS, 10);
      claims.iat = iat;
      claims.jti = uuid.v4();
      claims.iss = process.env.JWT_ISSUER;
      jsonwebtoken.sign(claims, process.env.SECRET, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }

  public verifyandDecodeJwt(token: string) {
    return new Promise((resolve, reject) => {
      jsonwebtoken.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }
}

export const jwt = Jwt.getInstance();
