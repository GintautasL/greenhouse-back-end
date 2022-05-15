"use strict";

const UserController = require("../app/Controllers/Http/UserController");

const { validator } = use("Validator");

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("users", "UserController.store")
  .validator("StoreUser")
  .middleware("guest"); //register

Route.get("users", "UserController.index").middleware("auth", "adminAccess"); // get user list

Route.put(
  // admin confirm user
  "users/:id/confirm",
  "UserController.confirmUser"
).middleware("findUser", "adminAccess");

Route.get("user", "UserController.getMyProfile").middleware(["auth"]); //get my profile

Route.put(
  "user/greenhouseControl",
  "GreenhouseControlController.update"
).middleware("auth"); // edit greenhouseControl

Route.put(
  "user/greenhouseControl/temperatureAuto",
  "GreenhouseControlController.toggleTemperatureAuto"
).middleware("auth"); // toggle temperature auto
Route.put(
  "user/greenhouseControl/humidityAuto",
  "GreenhouseControlController.toggleHumidityAuto"
).middleware("auth"); // toggle temperature auto
Route.put(
  "user/greenhouseControl/fans",
  "GreenhouseControlController.toggleFans"
).middleware("auth"); // toggle temperature auto
Route.put(
  "user/greenhouseControl/light",
  "GreenhouseControlController.toggleLight"
).middleware("auth"); // toggle temperature auto
Route.put(
  "user/greenhouseControl/water",
  "GreenhouseControlController.toggleWater"
).middleware("auth"); // toggle temperature auto

Route.get(
  "user/greenhouseControl",
  "GreenhouseControlController.show"
).middleware("auth"); // get greenhouse control

Route.post("temperatureDatum", "TemperatureDatumController.store").middleware([
  "auth",
]); // create temperature data point

Route.post("humidityDatum", "HumidityDatumController.store").middleware([
  "auth",
]); // create humidity data point

Route.post("soilHumidityDatum", "SoilHumidityDatumController.store").middleware(
  ["auth"]
); // create soil humidity data point

Route.get(
  "statistics/temperature/month",
  "TemperatureDatumController.getTemperatureStatisticsMonth"
).middleware(["auth"]); //get temperature statistics month

Route.get(
  "statistics/temperature/day",
  "TemperatureDatumController.getTemperatureStatisticsDay"
).middleware(["auth"]); //get temperature statistics day

Route.get(
  "statistics/humidity/month",
  "HumidityDatumController.getHumidityStatisticsMonth"
).middleware(["auth"]); //get humidity statistics month

Route.get(
  "statistics/humidity/day",
  "HumidityDatumController.getHumidityStatisticsDay"
).middleware(["auth"]); //get humidity statistics day

Route.get(
  "statistics/soilHumidity/month",
  "SoilHumidityDatumController.getSoilHumidityStatisticsMonth"
).middleware(["auth"]); //get soil humidity statistics month

Route.get(
  "statistics/soilHumidity/day",
  "SoilHumidityDatumController.getSoilHumidityStatisticsDay"
).middleware(["auth"]); //get soil humidity statistics day

Route.get("controllerStatus", "UserController.getControllerStatus").middleware([
  "auth",
]);

Route.post("login", "AuthController.login").middleware(["guest"]);

Route.post("getToken", "AuthController.getMicrocontrollerToken").middleware([
  "auth",
]); // token for microcontroller

Route.post("logout", "AuthController.logout").middleware(["auth"]);

Route.post("refresh", "AuthController.refresh");
