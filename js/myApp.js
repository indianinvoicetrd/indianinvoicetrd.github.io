function toast(text,time) {
  Toastify({
      text: text,
      duration: time,
      gravity: "top", // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      stopOnFocus: true // Prevents dismissing of toast on hover
    }).showToast();
}





// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDpPnbko3kkHi-WSwdcp7RPOLFYkK3xYrU",
  authDomain: "jul2019-5f07b.firebaseapp.com",
  databaseURL: "https://jul2019-5f07b.firebaseio.com",
  projectId: "jul2019-5f07b",
  messagingSenderId: "580337441997",
  appId: "1:580337441997:web:72101411ee8e0a3a"
};
firebase.initializeApp(firebaseConfig);


var app = angular.module("myApp", ["ngRoute", 'ngSanitize']);



app.service("notification", function($timeout, $rootScope){
  this.show = function showAlert(a,b=7){
    $rootScope.stext = a;
    $rootScope.sclass = "inherit";
    $rootScope.sanim = "fadein 0.5s, fadeout "+b/3+"s "+b/3*2+"s;";
    $timeout(function(){$rootScope.sclass = "none";}, b*1000);
  };
});



  app.config(function($routeProvider) {
      $routeProvider
      .when("/homePage",     { templateUrl : "./view/homePage.html"})
      .when("/loginPage",     { templateUrl : "./view/loginPage.html"})
      .otherwise({ redirectTo: '/loginPage' });
  });





  app.run(function ($location, $window, $rootScope) {
      $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
        $location.url($rootScope.userType==='loggedIn' ? "/homePage" : "/loginPage");
      });
  });



app.controller("initMain", function($rootScope, $location) {
  console.log("init trigger");
  console.log($rootScope.userType);

  firebase.auth().onAuthStateChanged(function(user) {
    $rootScope.$apply(function() {
      $rootScope.user = user;
      $rootScope.userType = user ? 'loggedIn' : 'loggedOut'
      $location.url($rootScope.userType==="loggedIn" ? "/homePage" : "/loginPage");
    });
  });


});
