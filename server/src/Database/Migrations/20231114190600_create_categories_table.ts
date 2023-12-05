import { Knex } from "knex";

export async function up(knex: Knex) : Promise<void> {
    await knex.schema.createTable('categories', table => {
        table.increments('id').primary();
        table.string('name', 100).notNullable();
      });
};

export async function down(knex: Knex) : Promise<void> {
    await knex.schema.dropTable("categories");
};
