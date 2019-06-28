import { RouteType } from "./enum";

export const Utils = {
  copyObj(obj) {
    return Object.assign({}, obj);
  },

  getRoutePrefix(
    requestType: RouteType,
    endPointName: string,
    apiVersion: number = 1
  ) {
    if (requestType === RouteType.private) {
      return "/api/v" + apiVersion + endPointName;
    } else if (requestType === RouteType.public) {
      return "/api/public" + endPointName;
    } else {
      return endPointName;
    }
  },

  /**
   *
   * @param email Validating Email from regex
   */
  isEmailValid(email: string) {
    const emailRegex = new RegExp(
      /^(([^<>[\]\\.\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
    );
    let emailValid = true;
    if (!this.charactersInEmailAreValid(email)) {
      emailValid = false;
    } else if (email.indexOf("@") < 1) {
      emailValid = false;
    } else if (email.split("@").length > 2) {
      emailValid = false;
    } else if (email.lastIndexOf(".") <= email.indexOf("@")) {
      emailValid = false;
    } else if (
      Math.max(email.indexOf("+"), email.indexOf("~")) >= email.indexOf("@")
    ) {
      emailValid = false;
    } else if (email.indexOf("@") === email.length) {
      emailValid = false;
    } else if (email.indexOf("..") >= 0) {
      emailValid = false;
    } else if (
      email.charAt(email.length - 1).indexOf(".") >= 0 ||
      email.indexOf(".") === 0
    ) {
      emailValid = false;
    } else if (!emailRegex.test(email)) {
      emailValid = false;
    }
    return emailValid;
  },

  charactersInEmailAreValid(email) {
    let parsed = true;
    const validMailchars = "abcdefghijklmnopqrstuvwxyz0123456789@.-_+~'!$&*,=;";
    for (let i = 0; i < email.length; i++) {
      const letter = email.charAt(i).toLowerCase();
      if (validMailchars.indexOf(letter) !== -1) {
        continue;
      }
      parsed = false;
      break;
    }
    return parsed;
  }
};
