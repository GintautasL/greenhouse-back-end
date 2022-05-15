"use strict";

const BadRequestException = use("App/Exceptions/BadRequestException");

class TemperatureDatumController {
  /**
   * Create/save a new Temperature data point.
   * POST
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const user = auth.user;
    const temperatureData = request.only(["temperature"]);
    if (Object.keys(temperatureData).length === 0) {
      throw new BadRequestException("No data");
    }
    await user.temperatureDatum().create(temperatureData);
    response.status(201).send({});
  }

  //   temperature month
  async getTemperatureStatisticsMonth({ auth, request }) {
    const user = auth.user;
    const temperatureDatum = await user
      .temperatureDatum()
      .where(
        "created_at",
        ">=",
        new Date(request._qs.year, request._qs.month - 1, 1)
      )
      .where(
        "created_at",
        "<=",
        new Date(request._qs.year, request._qs.month - 1, 31)
      )
      .fetch();
    return temperatureDatum;
  }

  // temperature day
  async getTemperatureStatisticsDay({ auth, request }) {
    const user = auth.user;

    const temperatureDatum = await user
      .temperatureDatum()
      .where(
        "created_at",
        ">=",
        new Date(request._qs.year, request._qs.month - 1, request._qs.day, 0)
      )
      .where(
        "created_at",
        "<=",
        new Date(request._qs.year, request._qs.month - 1, request._qs.day, 24)
      )
      .fetch();
    return temperatureDatum;
  }
}

module.exports = TemperatureDatumController;
