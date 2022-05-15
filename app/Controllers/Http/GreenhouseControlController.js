"use strict";

const GreenhouseControl = use("App/Models/GreenhouseControl");

const AuthorizationService = use("App/Services/AuthorizationService");

class GreenhouseControlController {
  /**
   * Update greenhouseControl details.
   * PUT or PATCH greenhouseControl
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ request, auth }) {
    const user = auth.user;
    const greenhouseControl = await GreenhouseControl.query()
      .where("user_id", user.id)
      .first();
    //console.log(greenhouseControl);
    AuthorizationService.verifyPermission(greenhouseControl, user);
    const greenhouseControlData = request.only([
      "is_temperature_auto",
      "is_humidity_auto",
      "max_temperature",
      "min_humidity",
      "manual_fans",
      "manual_light",
      "manual_water",
      "water_level",
    ]);
    greenhouseControl.merge(greenhouseControlData);
    await greenhouseControl.save();
  }

  /**
   * Display greenhouseControl.
   * GET greenhouseControl
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ request, auth }) {
    const user = auth.user;
    let active = false;

    const greenhouseControl = await GreenhouseControl.query()
      .where("user_id", user.id)
      .first();

    const soilHumidityDatum = await user
      .soilHumidityDatum()
      .getMax("created_at");

    const humidityDatum = await user.humidityDatum().getMax("created_at");

    const temperatureDatum = await user.temperatureDatum().getMax("created_at");

    const dateNow = new Date();
    dateNow.setMinutes(dateNow.getMinutes() - 2);

    if (
      humidityDatum > dateNow &&
      temperatureDatum > dateNow &&
      soilHumidityDatum > dateNow
    ) {
      active = true;
    }
    const finalGreenhouseControl = {
      ...greenhouseControl.$attributes,
      is_active: active,
    };
    return finalGreenhouseControl;
  }

  async toggleTemperatureAuto({ request, auth }) {
    const user = auth.user;
    const greenhouseControl = await GreenhouseControl.query()
      .where("user_id", user.id)
      .first();
    AuthorizationService.verifyPermission(greenhouseControl, user);
    let greenhouseControlData = {
      is_temperature_auto: !greenhouseControl.is_temperature_auto,
    };

    greenhouseControl.merge(greenhouseControlData);
    await greenhouseControl.save();
  }

  async toggleHumidityAuto({ request, auth }) {
    const user = auth.user;
    const greenhouseControl = await GreenhouseControl.query()
      .where("user_id", user.id)
      .first();
    AuthorizationService.verifyPermission(greenhouseControl, user);
    let greenhouseControlData = {
      is_humidity_auto: !greenhouseControl.is_humidity_auto,
    };

    greenhouseControl.merge(greenhouseControlData);
    await greenhouseControl.save();
  }

  async toggleFans({ request, auth }) {
    const user = auth.user;
    const greenhouseControl = await GreenhouseControl.query()
      .where("user_id", user.id)
      .first();
    AuthorizationService.verifyPermission(greenhouseControl, user);
    let greenhouseControlData = {
      manual_fans: !greenhouseControl.manual_fans,
    };

    greenhouseControl.merge(greenhouseControlData);
    await greenhouseControl.save();
  }
  async toggleLight({ request, auth }) {
    const user = auth.user;
    const greenhouseControl = await GreenhouseControl.query()
      .where("user_id", user.id)
      .first();
    AuthorizationService.verifyPermission(greenhouseControl, user);
    let greenhouseControlData = {
      manual_light: !greenhouseControl.manual_light,
    };

    greenhouseControl.merge(greenhouseControlData);
    await greenhouseControl.save();
  }
  async toggleWater({ request, auth }) {
    const user = auth.user;
    const greenhouseControl = await GreenhouseControl.query()
      .where("user_id", user.id)
      .first();
    AuthorizationService.verifyPermission(greenhouseControl, user);
    let greenhouseControlData = {
      manual_water: !greenhouseControl.manual_water,
    };

    greenhouseControl.merge(greenhouseControlData);
    await greenhouseControl.save();
  }
}

module.exports = GreenhouseControlController;
