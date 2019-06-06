var firebaseConfig = {
  apiKey: "AIzaSyBmsIyZy9XxAfXNQ3V0yQTEUDadiXq3Gjs",
  authDomain: "ucb-bootcamp-01.firebaseapp.com",
  databaseURL: "https://ucb-bootcamp-01.firebaseio.com",
  projectId: "ucb-bootcamp-01",
  storageBucket: "",
  messagingSenderId: "359458899422",
  appId: "1:359458899422:web:84e04e4d40455d8d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();


var renderCurrentschedule = function () {

}

var getCurrentSchedule = function () {

}
var calculateNextArrival = function () {

}

var getTrainByName = function (name) {

}

var renderNewTrain = function () {
  //get the data from form
  let name = $('#name').val();
  let destination = $('#destination').val();
  let firstTrainTime = $('#firstTrainTime').val();
  let frequency = $('#frequency').val();
  let minutesAway = $('#minutesAway').val();

 //createNew Row and columns within and populate it with data from form
  let newDiv = $('<div>').attr('class', "row");
  let itemName = $('<h6>').attr('class', 'col-sm-2').text(name);
  let itemDestination = $('<h7>').attr('class', 'col-sm-2').text(destination);
  let itemFirstTime = $('<h7>').attr('class', 'col-sm-2').text(firstTrainTime);
  let itemFrequency = $('<h7>').attr('class', 'col-sm-2').text(frequency);
  let itemMinAway = $('<h7>').attr('class', 'col-sm-2').text(minutesAway);

  //append all the items to the newDiv row
  newDiv.append(itemName).append(itemDestination).append(itemFirstTime).append(itemFrequency).append(itemMinAway);
  //render on the page
  $('#TrainData').append(newDiv);

}

var logNewTrain = function(train){
  database.ref()

}



//on sumbit event 

$(document).on("click", '#submit', function () {
  console.log('sumbit');
  renderNewTrain();


});