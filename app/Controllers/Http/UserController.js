"use strict";

const User = use("App/Models/User");
const GreenhouseControl = use("App/Models/GreenhouseControl");

const AuthorizationService = use("App/Services/AuthorizationService");
const Config = use("Config");
const rolesObj = Config.get("roles");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */

class UserController {
  /**
   * Show a list of all users.
   * GET users
   */
  async index() {
    return await User.query().with("roles").fetch();
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const userData = request.only(["username", "password"]);
    const userRole = await AuthorizationService.getRoleId(rolesObj.USER);
    const user = await User.create(userData);
    const userID = user.id;

    await user.roles().attach([userRole]);
    await user.greenhouse_control().create({ user_id: userID });
    response.status(201).send({});
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ request: { user } }) {
    return user;
  }

  /**
   * confirm user.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async confirmUser({ request }) {
    const { user } = request;
    const userData = { is_confirmed: !user.is_confirmed };
    user.merge(userData);
    await user.save();
  }

  /**
   * Gets user profile
   * GET user
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async getMyProfile({ auth }) {
    const user = auth.user;
    const userRoles = await user.roles().fetch();
    user.roles = userRoles;
    return user;
  }
}

module.exports = UserController;
