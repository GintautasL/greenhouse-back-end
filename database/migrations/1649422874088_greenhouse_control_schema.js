"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class GreenhouseControlSchema extends Schema {
  up() {
    this.create("greenhouse_controls", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.boolean("is_temperature_auto").defaultTo(false);
      table.boolean("is_humidity_auto").defaultTo(false);
      table.float("max_temperature").notNullable().defaultTo(40);
      table.float("min_humidity").notNullable().defaultTo(50);
      table.boolean("manual_fans").defaultTo(false);
      table.boolean("manual_light").defaultTo(false);
      table.boolean("manual_water").defaultTo(false);
      table.integer("water_level").defaultTo(1);
      table.timestamps();
    });
  }

  down() {
    this.drop("greenhouse_controls");
  }
}

module.exports = GreenhouseControlSchema;
