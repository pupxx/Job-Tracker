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
          job.phoneScreen = moment(job.datePhoneScreen).format('ll')
          job.dateAppliedOn = moment(job.dateApplied).format('ll')
          job.takehome = moment(job.dateSubmittedTakeHome).format('ll')
          job.interview = moment(job.dateInPersonInterview).format('ll')
          job.followUp = moment(job.dateFollowUp).format('ll')
          job.notes.forEach((note)=>{
            note.noteDate = moment(note.noteCreatedAt).format('ll')
            note.noteCreatedAt = moment(note.noteCreatedAt, 'YYYYMMDD').fromNow();
          })
        })
        console.log(vm.allJobs);
      })
    }

    function addJob(){
      let job = vm.newJob;
      delete vm.newJob;
      jobService.addJob(job).then((addedJob)=>{
        console.log(addedJob);
        vm.getAllJobs();
      });
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

    function toggleEditForm(job){
      if(!job.editJob){
        job.editJob = true;
      }else{
        job.editJob = false;
      }
      job.dateApplied = moment(job.dateApplied).format('YYYY-MM-DD');
      job.datePhoneScreen = moment(job.datePhoneScreen).format('YYYY-MM-DD')

    }

    function toggleNotesForm(job){
      console.log(job.showNotesForm);
      if(job.showNotesForm === false){
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
        console.log(addedNote);
        vm.getAllJobs()
      })
    }

  }
})()
