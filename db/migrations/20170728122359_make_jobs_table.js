exports.up = function(knex) {
  return knex.schema.createTable('jobs', (table) => {
    table.increments();
    table.text('title').notNullable().defaultTo('');
    table.text('description').notNullable().defaultTo('');
    table.string('contactFirstName').notNullable().defaultTo('');
    table.string('contactLastName').notNullable().defaultTo('');
    table.string('contactEmail').notNullable().defaultTo('');
    table.string('contactPhone').notNullable().defaultTo('');
    table.text('jobUrl').notNullable().defaultTo('');
    table.date('dateApplied').notNullable();

    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('jobs');
};
