"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");
const message = "Bad Request";
const status = 400;

class BadRequestException extends LogicalException {
  constructor(customMessage) {
    super(customMessage || message, status);
  }

  handle(error, { response }) {
    response.status(this.status).send({ error: this.message });
  }
}

module.exports = BadRequestException;
