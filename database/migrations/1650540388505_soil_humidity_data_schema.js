"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SoilHumidityDataSchema extends Schema {
  up() {
    this.create("soil_humidity_data", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.float("soil_humidity").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("soil_humidity_data");
  }
}

module.exports = SoilHumidityDataSchema;
