import { Knex } from "knex";


exports.up = function(knex: any) {
    return knex.schema
    .createTable('products', function(table:any) {
        table.increments('id').primary();
        table.integer('category_id').unsigned().references('products_categories.id');

        table.string('name',300).notNullable();
      });
};



exports.down = function(knex: any) {
    return knex.schema
    .dropTable('products',true);
};