"use strict";

const BadRequestException = use("App/Exceptions/BadRequestException");

class SoilHumidityDatumController {
  /**
   * Create/save a new soil humidity data point.
   * POST
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const user = auth.user;
    const soilHumidityData = request.only(["soil_humidity"]);
    if (Object.keys(soilHumidityData).length === 0) {
      throw new BadRequestException("No data");
    }
    await user.soilHumidityDatum().create(soilHumidityData);
    response.status(201).send({});
  }

  //  soil humidity month
  async getSoilHumidityStatisticsMonth({ auth, request }) {
    const user = auth.user;
    //console.log(request._qs);
    const soilHumidityDatum = await user
      .soilHumidityDatum()
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
    return soilHumidityDatum;
  }

  // soil humidity day
  async getSoilHumidityStatisticsDay({ auth, request }) {
    const user = auth.user;
    //console.log(request._qs);
    const soilHumidityDatum = await user
      .soilHumidityDatum()
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
    return soilHumidityDatum;
  }
}

module.exports = SoilHumidityDatumController;
