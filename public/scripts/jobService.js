(function() {
  'use strict';

  angular
  .module('app')
  .service('jobService', jobService)

  jobService.$inject = ['API_BASE_URL','$http']


  function jobService(baseUrl, $http) {

    this.getAllJobs = ()=>{
      return $http.get(`${baseUrl}/api-jobs`).then((allJobs)=>{
        console.log(allJobs);
        this.allJobs = allJobs.data
      })
    }

    this.addJob = (job)=>{
      return $http.post(`${baseUrl}/api-jobs/add-job`, job).then((addedJob)=>{
        this.addedJob = addedJob.data[0]
      })
    }

    this.editThisJob = (job)=>{
      let id = job.id;
      return $http.put(`${baseUrl}/api-jobs/edit-job/${id}`, job)
    }

    this.deleteJob = (job)=>{
      let id = job.id
      return $http.delete(`${baseUrl}/api-jobs/delete/${id}`)
    }

    this.addNote = (note)=>{
      return $http.post(`${baseUrl}/api-jobs/add-note`, note)
    }

  }
})()
