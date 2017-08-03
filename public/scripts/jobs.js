(function(){
  angular.module('app')
  .component('jobsIndex', {
    controller: controller,
    templateUrl: './scripts/jobs.html'
  })

  controller.$inject = ['API_BASE_URL', '$http', '$state', 'jobService']
  function controller (baseUrl, $http, $state, jobService){
    const vm = this


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
          job.notes.forEach((note)=>{
            vm.noteDate = moment(note.noteCreatedAt).format('ll')
            note.noteCreatedAt = moment(note.noteCreatedAt, 'YYYYMMDD').fromNow();
          })
        })
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
      job.dateApplied = moment(job.dateApplied).format('YYYY-MM-DD')
      if(job.editJob === false){
        job.editJob = true;
      }else{
        job.editJob = false;
      }
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
