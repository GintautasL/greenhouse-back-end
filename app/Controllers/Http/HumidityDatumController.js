"use strict";

const BadRequestException = use("App/Exceptions/BadRequestException");

class HumidityDatumController {
  /**
   * Create/save a new humidity data point.
   * POST
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const user = auth.user;
    const humidityData = request.only(["humidity"]);
    if (Object.keys(humidityData).length === 0) {
      throw new BadRequestException("No data");
    }

    await user.humidityDatum().create(humidityData);
    response.status(201).send({});
  }

  //   humidity month
  async getHumidityStatisticsMonth({ auth, request }) {
    const user = auth.user;
    const humidityDatum = await user
      .humidityDatum()
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
    return humidityDatum;
  }

  //humidity day
  async getHumidityStatisticsDay({ auth, request }) {
    const user = auth.user;
    const humidityDatum = await user
      .humidityDatum()
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
    return humidityDatum;
  }
}

module.exports = HumidityDatumController;
