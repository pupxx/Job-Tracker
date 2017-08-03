(function() {
  angular
    .module('app')
    .config(config)

  config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider']

  function config( $stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true)

    $stateProvider
    .state({
      name: 'home',
      url: '/',
      redirectTo: 'jobs'
    })



    .state({
      name: 'jobs',
      url: '/view-all-jobs',
      component: 'jobsIndex'
    })

    // .state({
    //   name: 'admin',
    //   url: '/admin',
    //   component: 'adminIndex',
    //   redirectTo: 'admin.practice'
    // })


// ************* Nested States *****************


    // .state({
    //   name: 'admin.practice',
    //   url: '/practices',
    //   component: 'adminPractice'
    // })



  }
})()
