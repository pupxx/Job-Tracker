exports.up = function(knex) {
  return knex.schema.createTable('jobs', (table) => {
    table.increments();
    table.string('title').notNullable().defaultTo('');
    table.string('description').notNullable().defaultTo('');
    table.string('contactFirstName').notNullable().defaultTo('');
    table.string('contactLastName').notNullable().defaultTo('');
    table.string('contactEmail').notNullable().defaultTo('');
    table.string('contactPhone').notNullable().defaultTo('');
    table.string('jobUrl').notNullable().defaultTo('');
    table.date('dateApplied').notNullable();

    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('jobs');
};
