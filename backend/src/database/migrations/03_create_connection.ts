import Knex from 'knex';

export async function up(knex: Knex) {
  await knex.schema.createTable('connections', table => {
    table.increments('id')
      .primary();

    table.integer('userId')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
      
    table.timestamp('createdAt')
    .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    .notNullable()

  });

}

export async function down(knex: Knex) {
  await knex.schema.dropTable('connections');
}