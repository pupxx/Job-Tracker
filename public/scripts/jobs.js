(function(){
  angular.module('app')
  .component('jobsIndex', {
    controller: controller,
    templateUrl: './scripts/jobs.html'
  })

  controller.$inject = ['API_BASE_URL', '$http', '$state', 'jobService']
  function controller (baseUrl, $http, $state, jobService){
    const vm = this

    // vm.newJobFromForm = Object.assign({}, job)

    vm.$onInit = onInit;
    vm.toggleForm = toggleForm;
    vm.getAllJobs = getAllJobs;
    vm.addJob = addJob;
    vm.setTab = setTab;
    vm.toggleNotes = toggleNotes;
    vm.toggleEditForm = toggleEditForm;
    vm.toggleNotesForm = toggleNotesForm;
    vm.editThisJob = editThisJob;
    vm.deleteJob = deleteJob;
    vm.addNote = addNote;
    vm.showNotes = false;
    vm.editJob = false;
    vm.convertFromNull = convertFromNull;
    vm.convertValueForEditForm = convertValueForEditForm;




    function onInit (){
      vm.show = false;
      vm.getAllJobs();
    }

    function toggleForm(){
      if(vm.show === false){
        vm.show = true
      } else{
        vm.show = false
      }
    }

    function getAllJobs(){
      jobService.getAllJobs().then((allJobs)=>{
        vm.allJobs = jobService.allJobs
        vm.allJobs.forEach((job)=>{
          job.showNotes = false
          job.dateAppliedOn = moment(job.dateApplied).format('ll')

          job.phoneScreen = convertFromNull(job.datePhoneScreen, job.phoneScreen)
          job.takeHome = convertFromNull(job.dateSubmittedTakeHome, job.takeHome)
          job.interview = convertFromNull(job.dateInPersonInterview, job.interview)
          job.followUp = convertFromNull(job.dateFollowUp, job.followUp)

          if(job.datePhoneScreen != null || job.dateSubmittedTakeHome != null || job.dateInPersonInterview != null){
            job.contacted = true;
          }else{
            job.contacted = false;
          }


          job.notes.forEach((note)=>{
            note.noteDate = moment(note.noteCreatedAt).format('ll')
            note.noteCreatedAt = moment(note.noteCreatedAt, 'YYYYMMDD').fromNow();
          })
        })

      })
    }

    function convertFromNull(value, changedValue){
      if(value === null){
        changedValue = ''
      }else{
        changedValue = moment(value).format('ll')
      }
      return changedValue
    }

    function addJob(){
      let job = vm.newJob;
      delete vm.newJob;
      jobService.addJob(job).then((addedJob)=>{
        vm.getAllJobs();
      })
    }

    function setTab(num){
      if(vm.tab === num){
        vm.tab = 0
      }else{
        vm.tab = num
      }
    }

    function toggleNotes(job){
      if(job.showNotes === false){
        job.showNotes = true;
      }else{
        job.showNotes = false;
      }
    }

    function convertValueForEditForm(value){
      if(value === null){
        value = ''
      }else{
        value = moment(value).format('YYYY-MM-DD')
      }
      return value
    }

    function toggleEditForm(job){
      if(!job.editJob){
        job.editJob = true;
      }else{
        job.editJob = false;
      }
      job.dateApplied = moment(job.dateApplied).format('YYYY-MM-DD');

      job.datePhoneScreen = convertValueForEditForm(job.datePhoneScreen)
      job.dateSubmittedTakeHome = convertValueForEditForm(job.dateSubmittedTakeHome)
      job.dateInPersonInterview = convertValueForEditForm(job.dateInPersonInterview)
      job.dateFollowUp = convertValueForEditForm(job.dateFollowUp)
    }

    function toggleNotesForm(job){
      if(!job.showNotesForm){
        job.showNotesForm = true;
      }else{
        job.showNotesForm = false;
      }
    }

    function editThisJob(job){
      job.dateApplied = moment(job.dateApplied).format('MM/DD/YYYY')
      jobService.editThisJob(job).then((editedJob)=>{
        vm.getAllJobs()
      })

    }

    function deleteJob(job){
      jobService.deleteJob(job).then((deletedJob)=>{
        vm.getAllJobs()
      })
    }

    function addNote(job){
      let note = {
        note: job.note,
        job_id: job.id
      }
      delete job.note
      jobService.addNote(note).then((addedNote)=>{
        vm.getAllJobs()
      })
    }

  }
})()
