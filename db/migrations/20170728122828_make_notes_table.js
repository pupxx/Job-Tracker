exports.up = function(knex) {
  return knex.schema.createTable('notes', (table) => {
    table.increments();
    table.text('note').notNullable().defaultTo('');
      table.integer('job_id').references('jobs.id').onDelete('CASCADE').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('notes');
};
