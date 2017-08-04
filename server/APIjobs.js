var express = require('express');
var router = express.Router();
var knex = require('../db/connection.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  return knex('jobs')
  .select('*', 'created_at as createdAT')
  .then(jobs => {
    let promises = jobs.map(job => {
      return knex('notes')
      .select('*', 'created_at as noteCreatedAt')
      .where({ job_id: job.id })
      .then(notes => {
        job.notes = notes
        return job
      })
    })
    return Promise.all(promises)
  }).then((allJobs)=>{
    res.send(allJobs)
  }).catch((err)=>{
    console.log(err);
  })
});

router.post('/add-job', function (req, res, next){
  let job = req.body
  knex('jobs').insert(job).returning('*').then((addedJob)=>{
    res.send(addedJob);
  })
})

router.delete('/delete/:id', function (req, res){
  let id = req.params.id
  console.log(id);
  knex('jobs').del().where('id', id).returning('*').then((deletedJob)=>{
    res.send(deletedJob)
  })
})

router.post('/add-note', function (req, res){
  let note = {
    note: req.body.note,
    job_id: req.body.job_id
  }
  knex('notes').insert(note).returning('*').then((addedNote)=>{
    res.send(addedNote)
  })
})

router.put('/edit-job/:id', function (req, res){
  let id = req.params.id;
  let job = {
    title: req.body.title,
    description: req.body.description,
    company: req.body.company,
    city: req.body.city,
    state: req.body.state,
    contactFirstName: req.body.contactFirstName,
    contactLastName: req.body.contactLastName,
    contactEmail: req.body.contactEmail,
    created_at: req.body.created_at,
    contactPhone: req.body.contactPhone,
    jobUrl: req.body.jobUrl,
    dateApplied: req.body.dateApplied,
    datePhoneScreen: req.body.datePhoneScreen,
    dateSubmittedTakeHome: req.body.dateSubmittedTakeHome,
    dateInPersonInterview: req.body.dateInPersonInterview,
    dateFollowUp: req.body.dateFollowUp
  }
  job.datePhoneScreen = convertFromNull(job.datePhoneScreen)
  job.dateSubmittedTakeHome = convertFromNull(job.dateSubmittedTakeHome)
  job.dateInPersonInterview = convertFromNull(job.dateInPersonInterview)
  job.dateFollowUp = convertFromNull(job.dateFollowUp)

  knex('jobs').update(job).where('id', id).returning('*').then((editedJobId)=>{
    res.send(editedJobId)
  })
})

function convertFromNull(value){
  if(value === ''){
    value = null
  }
  return value
}

module.exports = router;
