exports.seed = function(knex) {
  return knex('notes').del()
    .then(() => {
      return knex('notes').insert([{
		 id: 1,
        note: 'Spoke with someone about this job.',
        job_id: 1,
        created_at: "2017-07-28T22:52:03.953Z",
        updated_at: new Date()
      },{
		 id: 2,
        note: 'More conversations about this job.',
        job_id: 1,
        created_at: "2017-07-28T22:53:03.953Z",
        updated_at: new Date()
      },{
		 id: 3,
        note: 'More conversations about this job.',
        job_id: 1,
        created_at: "2017-07-31",
        updated_at: new Date()
      },{
		 id: 4,
        note: 'Spoke with someone about this job.',
        job_id: 2,
        created_at: "2017-07-28T22:52:03.953Z",
        updated_at: new Date()
      },{
		 id: 5,
        note: 'More conversations about this job.',
        job_id: 2,
        created_at: "2017-07-28T22:53:03.953Z",
        updated_at: new Date()
      },{
		 id: 6,
        note: 'More conversations about this job.',
        job_id: 2,
        created_at: "2017-07-31",
        updated_at: new Date()
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('notes_id_seq', (SELECT MAX(id) FROM notes));"
      );
    });
};
