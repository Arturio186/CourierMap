import { Knex } from "knex";

export async function up(knex: Knex) : Promise<void> {
    return knex.schema.createTable('products',  table => {
        table.increments('id').primary();
        
        table.decimal('price').unsigned();
        table.string('name', 300).notNullable();

        table.integer('category_id').unsigned().references('products_categories.id');
    });
};

export async function down(knex: Knex) : Promise<void> {
    return knex.schema.dropTable('products');
};