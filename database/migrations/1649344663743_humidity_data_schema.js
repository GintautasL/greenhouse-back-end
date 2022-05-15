"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class HumidityDataSchema extends Schema {
  up() {
    this.create("humidity_data", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.float("humidity").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("humidity_data");
  }
}

module.exports = HumidityDataSchema;
