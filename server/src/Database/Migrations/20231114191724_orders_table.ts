import { Knex } from "knex";


export async function up(knex: Knex) : Promise<void> {
    return knex.schema
    .createTable('orders', function(table:any) {
        table.increments('id').primary();
        table.integer('courier_id').references('users.id');
        
        table.string('status',30);
        table.string('adress',200);
        table.string('note',200);
        table.string('phone',25);
       
        table.timestamp('order_time');
        table.timestamp('delivery_time');
      });
};

export async function down(knex: Knex) : Promise<void> {
    return knex.schema.dropTable('orders');
};