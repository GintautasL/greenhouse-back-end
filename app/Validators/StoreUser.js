"use strict";

class StoreUser {
  get rules() {
    return {
      username: "required|unique:users",
      password: "required",
    };
  }

  get messages() {
    return {
      "username.required": "You must provide a username",
      "username.unique": "This username is already in use",
      "password.required": "You must provide a password",
    };
  }

  get validateAll() {
    return true;
  }

  async fails(errorMessage) {
    return this.ctx.response.status(400).send(errorMessage);
  }
}

module.exports = StoreUser;
