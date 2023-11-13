import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', table => {
        table.increments('id').primary();

        table.string('surname').notNullable();
        table.string('name').notNullable();
        
        table.string('email').unique();
        table.string('password').notNullable();

        table.integer('role').notNullable().defaultTo(0);

        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users');
}

