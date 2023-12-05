import { Knex } from "knex";


export async function up(knex: Knex) : Promise<void> {
    return knex.schema.createTable('orders', table => {
            table.increments('id').primary();
            table.integer('courier_id').references('users.id');
            
            table.integer('status').defaultTo(1);
            table.string('address', 200);
            table.string('note', 200);

            table.decimal('map_x', 7, 4);
            table.decimal('map_y', 7, 4);

            table.string('client_name', 50);
            table.string('client_phone', 25);
        
            table.timestamp('order_time');
            table.timestamp('delivery_time');
        });
};

export async function down(knex: Knex) : Promise<void> {
    return knex.schema.dropTable('orders');
};