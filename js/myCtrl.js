app.controller("topMenuBar", function ($rootScope, $scope, $location) {
  let menuState = false;
  $scope.openMenu = function() {
    $scope.navClass = menuState? "" : "navBar-open" ;
    menuState = !menuState;
  };

  $scope.logout = function() {
    firebase.auth().signOut().then(function() {
      $rootScope.$apply(function() {
        delete $rootScope.user ;
        $rootScope.userType = 'loggedOut'
        $location.url("/loginPage");
        toast("Sign-out successful.",5000);
      });
    }).catch(function(error) {
      toast("An error happened.",5000);
    });
    $scope.openMenu()
  };

});



app.controller("loginPage", function ($rootScope, $scope, $location) {
$rootScope.loggedInState = 'none'

  init();
  function init() {
    $scope.mainBtn = 'Login'
    $scope.secBtn = 'New User ?'
    $scope.showName = 'none'
  }

$scope.newUser = function() {

  if($scope.secBtn==='New User ?'){
    $scope.mainBtn = 'Cancel'
    $scope.secBtn = 'Create User'
    $scope.showName = ''
  }else{
    console.log('Creating User');
    firebase.auth().createUserWithEmailAndPassword($scope.email, $scope.password)
    .then(function(user){
      user.updateProfile({ displayName: $scope.name, photoURL: "https://exam" });
      toast("Your account created successfully. Please confirm your email.",5000);
    })
    .catch(function(error) {
      toast(error.message,10000)
      console.log(error);
    });
  };

};


$scope.mainBtnClick = function() {
  console.log($location.path());
  if($scope.mainBtn==='Cancel'){ init()}
  else{
    toast("Connecting to server. Please wait...",5000)

    firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password)
      .then(function(k){
          $rootScope.$apply(function() {
            $location.url("/homePage");
            toast("User Logged in successful.",5000);
          });

      })
      .catch(function(error) {
        toast("User not loggedIn",10000)
        toast(error,10000)
        console.log(error);
      });
  }


};


});









function removeLoading(elmId){
  let elm = document.getElementById(elmId)
  for (var i = 0; i < elm.children.length; i++) { elm.children[i].classList.remove('loadingDiv') }
}




app.controller("homePage", function ($rootScope, $scope, $location, $compile) {



  function checkEmailVerification(iter) {
    // let user = firebase.auth().currentUser;
    if($rootScope.user.emailVerified){
      $scope.isEmailVerified = '';
      toast("Email Verified successfully.",5000);
      $scope.modalCloak = false;
      $scope.homeBackground = 'homeBackground'
      $rootScope.loggedInState = ''
      loadData();
    }
    else{
      $scope.isEmailVerified = 'emailNotVerified';
      $rootScope.user.sendEmailVerification()
      .then(function() {
        $rootScope.$apply(function() {
          $scope.modalCloak = true;
          $rootScope.loggedInState = 'none'
          });
        toast("Your account created successfully. Please confirm your email.",5000);
      })
      .catch(function(error) {
        toast("Error in confirmation email.",5000);
        if (iter<10) { checkEmailVerification(iter+1) }
      });
      document.getElementById('popupHtml').innerHTML = $scope.popupHtml['emailNotVerified'];
      $compile( document.getElementById('popupHtml') )($scope);

    };
  };


  $scope.retry = function() { checkEmailVerification(10); }


  $scope.logout = function() {
    firebase.auth().signOut().then(function() {
      $rootScope.$apply(function() {
        delete $rootScope.user ;
        $rootScope.userType = 'loggedOut'
        $location.url("/loginPage");
        toast("Sign-out successful.",5000);
      });
    }).catch(function(error) {
      toast("An error happened.",5000);
    });
  };





  $scope.invoice = [
    {uid:"qwe3432ewr",invoicedate:"3rdJul2018", number:12, client:{name:"clientName1"}, product:[
      {name:"Brokerage",amount:87897, tax:32432, total:3465456},
      {name:"Brokerage",amount:87897, tax:32432, total:3465456},
      {name:"Brokerage",amount:87897, tax:32432, total:3465456}
    ], invoice:{tax : 912312, amount:756}},
    {uid:"qwe3432eewwr",invoicedate:"4thJul2018", number:13, client:{name:"clientName2"}, product:[
      {name:"Brokerage",amount:13768, tax:8776, total:5635456},
      {name:"Brokerage",amount:13768, tax:8776, total:5635456}
    ], invoice:{tax : 2312312, amount:566878}},
    {uid:"qwe343dasdw2ewr", invoicedate:"6thJul2018", number:14, client:{name:"clientName3"}, product:[
      {name:"Brokerage",amount:23434, tax:324323, total:86786},
      {name:"Brokerage",amount:23434, tax:324323, total:86786},
      {name:"Brokerage",amount:23434, tax:324323, total:86786}
    ], invoice:{tax : 412312, amount:32878}},
    {uid:"q343432ewr",invoicedate:"8thJul2018", number:15, client:{name:"clientName4"}, product:[
      {name:"Brokerage",amount:234, tax:123, total:88786},
      {name:"Brokerage",amount:234, tax:123, total:88786}
    ], invoice:{tax : 6712312, amount:126878}},
  ]

  $scope.client = [
    {uid:"qwe3432ewr", address1:"LB-3, AB building",address2:"19, MJ Street",address3:"New Delhi-110001",email:"uers@email.com",gst:"kjndqwe234",isdefault:"true",name:"1Grey International Inc.",pan:"dse3ds34esdfs",phone:"9898989898",pos:"Delhi",scode:"07"},
    {uid:"qwe34323423",address1:"LB-3, AB building",address2:"19, MJ Street",address3:"New Delhi-110001",email:"uers@email.com",gst:"kjndqwe234",isdefault:"false",name:"2Grey International Inc.",pan:"dse3ds34esdfs",phone:"9898989898",pos:"Delhi",scode:"07"},
    {uid:"q234323432ewr",address1:"LB-3, AB building",address2:"19, MJ Street",address3:"New Delhi-110001",email:"uers@email.com",gst:"kjndqwe234",isdefault:"false",name:"3Grey International Inc.",pan:"dse3ds34esdfs",phone:"9898989898",pos:"Delhi",scode:"07"}
  ]

  $scope.user = [
    {uid:"qwe3432ewr", address1:"LB-3, AB building",address2:"19, MJ Street",address3:"New Delhi-110001",email:"uers@email.com",gst:"kjndqwe234",isdefault:"true",name:"1Grey International Inc.",pan:"dse3ds34esdfs",phone:"9898989898",pos:"Delhi",scode:"07"},
    {uid:"qwe34323423",address1:"LB-3, AB building",address2:"19, MJ Street",address3:"New Delhi-110001",email:"uers@email.com",gst:"kjndqwe234",isdefault:"false",name:"2Grey International Inc.",pan:"dse3ds34esdfs",phone:"9898989898",pos:"Delhi",scode:"07"},
    {uid:"q234323432ewr",address1:"LB-3, AB building",address2:"19, MJ Street",address3:"New Delhi-110001",email:"uers@email.com",gst:"kjndqwe234",isdefault:"false",name:"3Grey International Inc.",pan:"dse3ds34esdfs",phone:"9898989898",pos:"Delhi",scode:"07"}
  ]

$scope.product =[
  {uid:"sdfewr4", name:"Brokerage1", igst:"0", cgst:"9", sgst:"9", isfixed:"false"},
  {uid:"sdsadwr4", name:"Brokerage2", igst:"0", cgst:"29", sgst:"19", isfixed:"false"},
  {uid:"s234wr4", name:"Brokerage3", igst:"0", cgst:"91", sgst:"19", isfixed:"false"},
  {uid:"sdfe6fh4", name:"Brokerage4", igst:"0", cgst:"29", sgst:"19", isfixed:"false"},
]




  $scope.popupHtml =
  {


    emailNotVerified:   `
                  <hr><div class="headText3">
                    <b>
                      Congratulations ! <br>
                      Your account is created successfully.<br>
                      Please verify your email to continue.</b>
                  </div><hr><br>
                  <span class="login-btn" ng-click="retry()">Resend Email</span>
                  <span class="login-btn" ng-click="logout()">Logout</span>
                  `,

    user:   `
                  <div class="headText3">
                    <b>User Details</b>
                    <select class="select"
                    ng-model="selectedPopup"
                    ng-show="showPopupBtn"
                    ng-change="changePopup('Popup')"
                    ng-init=" selectedPopup = dataPopup[indexPopup]"
                    ng-options="x.name for x in dataPopup"></select>
                  </div><hr>
                  <form name="myForm">
                    <p type="Company Details"><input placeholder="Company Name" ng-model="tempPopup.name" ng-required=true></p>
                    <p type="Address Line 1"><input placeholder="Address Line 1" ng-model="tempPopup.address1" ng-required=true></p>
                    <p type="Address Line 2" class="smallMargin"><input placeholder="Address Line 2" ng-model="tempPopup.address2"></p>
                    <p type="Address Line 3" class="smallMargin"><input placeholder="Address Line 3" ng-model="tempPopup.address3"></p>
                    <p type="Phone:"><input placeholder="Contact Number" ng-model="tempPopup.phone" ng-required=true></p>
                    <p type="Email:" class="smallMargin"><input placeholder="Email" ng-model="tempPopup.email" ng-required=true></p>

                    <p type="State"><input placeholder="State" ng-model="tempPopup.pos" ng-required=true></p>
                    <p type="State Code" class="smallMargin"><input placeholder="State Code" ng-model="tempPopup.scode" ng-required=true></p>
                    <p type="PAN" class="smallMargin"><input placeholder="PAN" ng-model="tempPopup.pan" ng-required=true></p>
                    <p type="GST" class="smallMargin"><input placeholder="GST" ng-model="tempPopup.gst" ng-required=true></p>

                    <h4 ng-show="!myForm.$valid">* All field required</h4>

                    <div ng-show="myForm.$valid" class="popupBtn">
                      <span ng-show="!showPopupBtn" class="login-btn" ng-click="create('user')">Create</span>
                      <span ng-show="showPopupBtn" class="login-btn" ng-click="update('user')">Update</span>
                      <span ng-show="showPopupBtn" class="login-btn" ng-click="delete('user')">Delete</span>
                    </div>
                  </form>
                `,


    client:   `
                  <div class="headText3">
                    <b>Client Detail</b>
                    <select class="select"
                    ng-model="selectedPopup"
                    ng-show="showPopupBtn"
                    ng-change="changePopup('Popup')"
                    ng-init=" selectedPopup = dataPopup[indexPopup]"
                    ng-options="x.name for x in dataPopup"></select>
                  </div><hr>

                  <form name="myForm">
                    <p type="Company Details"><input placeholder="Company Name" ng-model="tempPopup.name" ng-required=true></p>
                    <p type="Address Line 1"><input placeholder="Address Line 1" ng-model="tempPopup.address1" ng-required=true></p>
                    <p type="Address Line 2" class="smallMargin"><input placeholder="Address Line 2" ng-model="tempPopup.address2" ng-required=true></p>
                    <p type="Address Line 3" class="smallMargin"><input placeholder="Address Line 3" ng-model="tempPopup.address3" ng-required=true></p>
                    <p type="Phone:"><input placeholder="Contact Number" ng-model="tempPopup.phone" ng-required=true></p>
                    <p type="Email:" class="smallMargin"><input placeholder="Email" ng-model="tempPopup.email" ng-required=true></p>

                    <p type="State"><input placeholder="State" ng-model="tempPopup.pos" ng-required=true></p>
                    <p type="State Code" class="smallMargin"><input placeholder="State Code" ng-model="tempPopup.scode" ng-required=true></p>
                    <p type="PAN" class="smallMargin"><input placeholder="PAN" ng-model="tempPopup.pan" ng-required=true></p>
                    <p type="GST" class="smallMargin"><input placeholder="GST" ng-model="tempPopup.gst" ng-required=true></p>

                    <h4 ng-show="!myForm.$valid">* All field required</h4>

                    <div ng-show="myForm.$valid" class="popupBtn">
                      <span ng-show="!showPopupBtn" class="login-btn" ng-click="create('client')">Create</span>
                      <span ng-show="showPopupBtn" class="login-btn" ng-click="update('client')">Update</span>
                      <span ng-show="showPopupBtn" class="login-btn" ng-click="delete('client')">Delete</span>
                    </div>
                  </form>
                `,
      invoice:`

              <div class="headText3">
                <b>Trade Detail</b>
                <select class="select"
                ng-model="selectedPopup"
                ng-show="showPopupBtn"
                ng-change="changePopup('Popup')"
                ng-init=" selectedPopup = dataPopup[indexPopup]"
                ng-options="x.number for x in dataPopup"></select>
              </div><hr>

              <form name="myForm">
                <p type="Client Name"><input placeholder="Cliennt Name" ng-model="tempPopup.client.name" ng-required=true></p>

                <p type="Invoice Date"><input placeholder="Invoice Date" ng-model="tempPopup.invoicedate" ng-required=true></p>
                <p type="Total Tax" class="smallMargin"><input placeholder="Total Tax" ng-model="tempPopup.invoice.tax" ng-required=true></p>
                <p type="Amount" class="smallMargin"><input placeholder="Amount" ng-model="tempPopup.invoice.amount" ng-required=true></p>
                <hr>
                <span class="head3" ng-repeat="x in tempPopup.product">
                  <p type="Product"><input placeholder="Product" ng-model="x.name" ng-required=true></p>
                  <p type="Amount" class="smallMargin"><input placeholder="Amount" ng-model="x.amount" ng-required=true></p>
                  <p type="Tax" class="smallMargin"><input placeholder="Tax" ng-model="x.tax" ng-required=true></p>
                  <p type="Total Amount" class="smallMargin"><input placeholder="Total Amount" ng-model="x.total" ng-required=true></p>
                </span>
                <hr>

                <h4 ng-show="!myForm.$valid">* All field required</h4>

                <div ng-show="myForm.$valid" class="popupBtn">
                  <span ng-show="!showPopupBtn" class="login-btn" ng-click="create('invoice')">Create</span>
                  <span ng-show="showPopupBtn" class="login-btn" ng-click="update()">Update</span>
                  <span ng-show="showPopupBtn" class="login-btn" ng-click="delete()">Delete</span>
                </div>
              </form>
              `
              ,
      product:`

              <div class="headText3">
                <b>Product Detail</b>
                <select class="select"
                ng-model="selectedPopup"
                ng-show="showPopupBtn"
                ng-if="showPopupBtn"
                ng-change="changePopup('Popup')"
                ng-init=" selectedPopup = dataPopup[indexPopup]"
                ng-options="x.name for x in dataPopup"></select>
              </div><hr>

              <form name="myForm">
                <p type="Product Name"><input placeholder="Product Name" ng-model="tempPopup.name" ng-required=true></p>

                <p type="SGST"><input placeholder="SGST" ng-model="tempPopup.sgst" ng-required=true></p>
                <p type="CGST" class="smallMargin"><input placeholder="CGST" ng-model="tempPopup.cgst" ng-required=true></p>
                <p type="IGST" class="smallMargin"><input placeholder="IGST" ng-model="tempPopup.igst" ng-required=true></p>
                <hr>
                <p type="Is Fixed Price"><input placeholder="Is Fixed Price" ng-model="tempPopup.isfixed" ng-required=true></p>
                <p type="Price" class="smallMargin"><input placeholder="Price" ng-model="tempPopup.price" ng-required=true></p>
                <hr>

                <h4 ng-show="!myForm.$valid">* All field required</h4>

                <div ng-show="myForm.$valid" class="popupBtn">
                  <span ng-show="!showPopupBtn" class="login-btn" ng-click="create('product')">Create</span>
                  <span ng-show="showPopupBtn" class="login-btn" ng-click="update()">Update</span>
                  <span ng-show="showPopupBtn" class="login-btn" ng-click="delete()">Delete</span>
                </div>
              </form>
            `
          }






  function updateHtml(id,html) {
    $scope.dataPopup = JSON.parse(JSON.stringify($scope[html]));
    document.getElementById(id).innerHTML = $scope.popupHtml[html];
    $compile( document.getElementById(id) )($scope);

  }


  $scope.popupShow = function(a) {
    if($scope['selected'+a]){ $scope.indexPopup = $scope[a].findIndex(x=>{return x.uid===$scope['selected'+a].uid})
    }else{ $scope.indexPopup = 0 }
    $scope.modalCloak = true;
    $scope.homeBackground = ''
    updateHtml('popupHtml',a)
    $scope.changePopup(a)
  };

  $scope.popupClose = function() { $scope.modalCloak = false; $scope.homeBackground = 'homeBackground' };



  $scope.newPopupShow = function(a) {
    $scope.modalCloak = true;
    $scope.homeBackground = ''
    updateHtml('popupHtml',a)
    $scope.showPopupBtn = false;
    $scope.tempPopup = tempPopupData[a]

  }

var tempPopupData = {
  user : {"address1":"","address2":"","address3":"","email":"","gst":"","isdefault":"true","name":"","pan":"","phone":"","pos":"","scode":""},
  client:{"address1":"","address2":"","address3":"","email":"","gst":"","isdefault":"","name":"","pan":"","phone":"","pos":"","scode":""},
  invoice:{invoicedate:""},
  product:{"name":"","igst":"","cgst":"","sgst":"","isfixed":""},

}



$scope.changePopup = function(a) {
  if ($scope.selectedPopup) {
    $scope.tempPopup = JSON.parse(JSON.stringify($scope.selectedPopup));
    $scope.showPopupBtn = true;
  }else{
    $scope.showPopupBtn = false;
    $scope.tempPopup = tempPopupData[a]
    console.log(a);
  }
};


function createData(data) {
  toast('Please wait while creating new data....',10000)
  let newPar = firebase.firestore().collection(data.path).doc()
  data.data.timestamp = firebase.firestore.FieldValue.serverTimestamp(),
  newPar.set( data.data )
  .then(function(snapshot) {
    toast(data.type+' Operation successful',5000)
    $scope.$apply(function(){ fetchData(data.type) })
  })
  .catch(function(error) {
    toast('Error in creating new data',10000)
    toast(error,10000)
    console.error("Error adding document: ", error);
  })

};

$scope.create = function(a) {
  console.log(a);
  createData({
    type:a,
    data:$scope.tempPopup,
    path:'users/'+$rootScope.user.uid+'/'+a+'/'
  })

};


function deleteData(data) {
  toast('Please wait while deleting data....',10000)
  let newPar = firebase.firestore()
  newPar.collection(data.path).doc(data.id).delete().then(function() {
      console.log("Document successfully deleted!");
      toast(data.type+' document successfully deleted!',10000)
      $scope.$apply(function(){ fetchData(data.type) })
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });

};

$scope.delete = function(a) {
  console.log(a);
  deleteData({
      type:a,
      path:"users/"+$rootScope.user.uid+"/"+a,
      id:$scope['selectedPopup']['id'],
  })

};




function loadData() {
  var lis = ['user','client','product','invoice']
  lis.forEach(x=>{ fetchData(x) });


  // add svg to floating action button
  let elm = document.getElementsByClassName("fab-icon-holder")
  for (var i = 0; i < elm.length; i++) { elm[i].innerHTML = getSVGIcon(elm[i].id) }
};

function fetchData(x) {
  $scope.popupClose()
  var db = firebase.firestore();
  db.collection("users/"+$rootScope.user.uid+"/"+x).get().then(function(querySnapshot) {
    console.log(x, querySnapshot);
    if(querySnapshot.size==0){
      document.getElementById(x+'-detail').innerHTML = getCardHtml({type:x, mode:'base'});
      $compile( document.getElementById(x+'-detail') )($scope);
      $scope[x] = {}    //blank data holder
    }else{
      toast(x+' data fetched successfully',5000)
      let tempFetchData = []
      querySnapshot.docs.forEach(y=>{
        let tempY = JSON.parse(JSON.stringify(y.data()))
        tempY.id = y.id
        tempFetchData.push(tempY)
      })

      $scope.$apply(function(){
        $scope[x] = tempFetchData
        if(x==='user'){
          let userIndex = $scope.user.findIndex(x=>{return x.isdefault==='true'})
          $scope.defaultuser = JSON.parse(JSON.stringify($scope.user[userIndex]));
        }
        document.getElementById(x+'-detail').innerHTML = getCardHtml({type:x, mode:'gen'});
        $compile( document.getElementById(x+'-detail') )($scope);
        removeLoading(x+'-detail');
      })

    }
  })
}



$scope.retry();




});
