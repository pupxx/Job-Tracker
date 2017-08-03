exports.seed = function(knex) {
  return knex('jobs').del()
    .then(() => {
      return knex('jobs').insert([{
		 id: 1,
        title: 'First Job applied For',
        description: 'Some type of description here',
        contactFirstName: 'Joe',
        contactLastName: 'Bob',
        contactEmail: 'joebob@gmail.com',
        contactPhone: '555-555-5555',
        dateApplied: '07/31/2017',
        jobUrl: 'http://www.ourfavoriterecipes.org',
        created_at: new Date(),
        updated_at: new Date()
      },{
		 id: 2,
        title: 'Second Job applied For',
        description: 'Some type of description here',
        contactFirstName: 'Sally',
        contactLastName: 'Smith',
        contactEmail: 'sallysmith@gmail.com',
        contactPhone: '444-444-4444',
        dateApplied: '06/15/2017',
        jobUrl: 'http://www.indeed.com',
        created_at: new Date(),
        updated_at: new Date()
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('jobs_id_seq', (SELECT MAX(id) FROM jobs));"
      );
    });
};
