import { Knex } from "knex";


exports.up = function(knex: any) {
    return knex.schema
    .createTable('orders', function(table:any) {
        table.increments('id').primary();
        table.integer('user_id').references('users.id');
        
        table.string('status',30);
        table.string('adress',200);
        table.string('note',200);
        table.string('phone',25);
       
        table.timestamp('order_time');
        table.timestamp('delivery_time');
      });
};



exports.down = function(knex: any) {
    return knex.schema
    .dropTable('orders',true);
};