import { Knex } from "knex";


exports.up = function(knex: any) {
    return knex.schema
    .createTable('products_lists', function(table:any) {
        table.integer('order_id').unsigned().references('orders.id');
        table.integer('product_id').unsigned().references('products.id');
        table.integer('quantity').unsigned().notNullable();
        table.primary(['order_id','product_id']);
      });
};



exports.down = function(knex: any) {
    return knex.schema
    .dropTable('products_lists',true);
};