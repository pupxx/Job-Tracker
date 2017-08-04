exports.up = function(knex) {
  return knex.schema.createTable('jobs', (table) => {
    table.increments();
    table.text('title').notNullable().defaultTo('');
    table.text('description').notNullable().defaultTo('');
    table.text('company').notNullable().defaultTo('');
    table.string('city').notNullable().defaultTo('');
    table.string('state').notNullable().defaultTo('');
    table.string('contactFirstName').defaultTo('Unknown');
    table.string('contactLastName').defaultTo('Unknown');
    table.string('contactEmail').defaultTo('Unknown');
    table.string('contactPhone').defaultTo('Unknown');
    table.text('jobUrl').notNullable().defaultTo('');
    table.date('dateApplied').notNullable();
    table.date('datePhoneScreen');
    table.date('dateSubmittedTakeHome');
    table.date('dateInPersonInterview');
    table.date('dateFollowUp');

    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('jobs');
};
