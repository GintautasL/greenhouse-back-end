"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TemperatureDataSchema extends Schema {
  up() {
    this.create("temperature_data", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.float("temperature").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("temperature_data");
  }
}

module.exports = TemperatureDataSchema;
