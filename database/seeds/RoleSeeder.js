"use strict";
const Config = use("Config");
const rolesObj = Config.get("roles");

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class RoleSeeder {
  async run() {
    //Seed roles
    const userRole = await Factory.model("App/Models/Role").create({
      title: rolesObj.USER,
    });
    const adminRole = await Factory.model("App/Models/Role").create({
      title: rolesObj.ADMIN,
    });

    //Seed admin
    const admin = await Factory.model("App/Models/User").create({
      username: "admin",
      password: "admin123",
      is_confirmed: true,
    });

    await admin.roles().attach([userRole.id, adminRole.id]);
  }
}

module.exports = RoleSeeder;
