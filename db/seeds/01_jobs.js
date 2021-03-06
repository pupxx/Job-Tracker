exports.seed = function(knex) {
  return knex('jobs').del()
    .then(() => {
      return knex('jobs').insert([{
		 id: 1,
        title: 'Job Name Here',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        company: 'Cool Company Name here',
        city: 'Seattle',
        state: 'WA',
        contactFirstName: 'Joe',
        contactLastName: 'Bob',
        contactEmail: 'joebob@gmail.com',
        contactPhone: '555-555-5555',
        dateApplied: '06/15/2017',
        datePhoneScreen: null,
        dateSubmittedTakeHome: '06/25/2017',
        dateInPersonInterview: '06/30/2017',
        dateFollowUp: '07/05/2017',
        jobUrl: 'http://www.ourfavoriterecipes.org',
        created_at: new Date(),
        updated_at: new Date()
      },{
		 id: 2,
        title: 'Job Name Here',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        company: 'Company Name Here',
        city: 'Seattle',
        state: 'WA',
        contactFirstName: 'Sally',
        contactLastName: 'Smith',
        contactEmail: 'sallysmith@gmail.com',
        contactPhone: '444-444-4444',
        dateApplied: '07/15/2017',
        datePhoneScreen: '07/20/2017',
        dateSubmittedTakeHome: '07/25/2017',
        dateInPersonInterview: '07/30/2017',
        dateFollowUp: '08/05/2017',
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
