import { Knex } from "knex";


exports.up = function(knex: any) {
    return knex.schema
    .createTable('products_categories', function(table:any) {
        table.increments('id').primary();
        table.string('category',100).notNullable();
      });
};



exports.down = function(knex: any) {
    return knex.schema
        .dropTable("products_categories");
  };
