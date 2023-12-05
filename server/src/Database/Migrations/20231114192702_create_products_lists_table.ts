import { Knex } from "knex";

export async function up(knex: Knex) : Promise<void> {
    return knex.schema.createTable('products_lists', table => {
        table.integer('order_id').unsigned()
            .references('orders.id').onDelete('CASCADE');

        table.integer('product_id').unsigned()
            .references('products.id').onDelete('CASCADE');

        table.integer('quantity').unsigned().notNullable();
        
        table.primary(['order_id','product_id']);
    });
};

export async function down(knex: Knex) : Promise<void> {
    return knex.schema.dropTable('products_lists');
};