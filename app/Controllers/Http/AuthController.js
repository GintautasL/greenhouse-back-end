"use strict";

const User = use("App/Models/User");
const ForbiddenException = use("App/Exceptions/ForbiddenException");
const NotFoundException = use("App/Exceptions/NotFoundException");

class AuthController {
  /**
   * Login and generate token
   * POST login
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async login({ request, auth }) {
    // do stuff

    const { username, password } = request.only(["username", "password"]);
    const user = await User.findBy("username", username);
    if (user) {
      if (user.is_confirmed == 0) {
        throw new ForbiddenException(
          "Please ask administrator to confirm your account"
        );
      }
    } else {
      throw new NotFoundException("Username doesn't exist");
    }
    auth.authenticatorInstance._serializerInstance._config.options.expiresIn = 86400; // 1 day

    return await auth.withRefreshToken().attempt(username, password);
  }

  async getMicrocontrollerToken({ request, auth }) {
    const { username, password } = request.only(["username", "password"]);

    auth.authenticatorInstance._serializerInstance._config.options.expiresIn = 604800; // 7 days

    return await auth.withRefreshToken().attempt(username, password);
  }

  /**
   * Refresh token
   * POST refresh
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async refresh({ request, auth }) {
    const { refreshToken } = request.only(["refreshToken"]);
    return await auth.generateForRefreshToken(refreshToken);
  }

  /**
   * Refresh token
   * POST refresh
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async logout({ response, auth }) {
    await auth.revokeTokens();
    response.status(200).send({});
  }
}

module.exports = AuthController;
