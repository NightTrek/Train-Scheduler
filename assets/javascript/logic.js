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
var id = 0;
var trainArray = [];

var renderCurrentschedule = async function () {
  $('#TrainData').empty();
  trainArray = [];
  const schdule = await getCurrentSchedule();
  for(let i =0; i<schdule.length;i++){
  console.log(i);
  if(schdule[i] === undefined){
    continue;
  }else{
  let T = new Train(i, schdule[i].trainData);
  trainArray.push(T);
    if(id <i){
      id =i;
    }
  }
}
}

var getCurrentSchedule = function () {
  return database.ref().once("value")
    .then(function (snapshot) {
      return snapshot.val();
    });

}
var calculateNextArrival = function () {

}

var getTrainByID = function (name) {

}




class Train {
  constructor(trainID, TD) {
    if (TD === undefined) {
      //get the data from form
      let name = $('#name').val();
      let destination = $('#destination').val();
      let firstTrainTime = $('#firstTrainTime').val();
      let frequency = $('#frequency').val();
      let minutesAway = $('#minutesAway').val();
      let firstTrain = moment({ hour:firstTrain.splice(0,2), minute:firstTrainTime.splice(2,2) });
      console.log(firstTrain)
      this.trainData = { name: name, destination: destination, firsttraintime: firstTrain, frequency: frequency, minAway: minutesAway, logged: false }
    } else{
      this.trainData = TD;
    }
    this.id = trainID;
    //createNew Row and columns within and populate it with data from form
    this.newDiv = $('<div>').attr('class', `row Train`).attr('id', `${trainID}`);
    this.itemName = $('<h6>').attr('class', 'col-sm-2');
    this.itemName.text(this.trainData.name);
    this.itemDestination = $('<h7>').attr('class', 'col-sm-2');
    this.itemDestination.text(this.trainData.destination);
    this.itemFirstTime = $('<h7>').attr('class', 'col-sm-2');
    this.itemFirstTime.text(this.trainData.firsttraintime);
    this.itemFrequency = $('<h7>').attr('class', 'col-sm-2');
    this.itemFrequency.text(this.trainData.frequency);
    this.itemMinAway = $('<h7>').attr('class', 'col-sm-2');
    this.itemMinAway.text(this.trainData.minAway);
    this.remove = $("<button>").attr("class", "col-sm-2 Train").attr('id', `${trainID}`).text("X");

    //append all the items to the newDiv row
    this.newDiv.append(this.itemName).append(this.itemDestination).append(this.itemFirstTime).append(this.itemFrequency).append(this.itemMinAway).append(this.remove);
    //render on the page
    $('#TrainData').append(this.newDiv);
    if(this.trainData.logged == false){
      this.trainData.logged = true;
      this.logTrainInDB();
    }

  }

  logTrainInDB() {
    console.log(this.id);
    console.log(this)
    let storetrain = {};
    storetrain[this.id] = this;
    database.ref().update(storetrain);
  }

  removeTrainFromDb(index){
    trainArray.splice(index,1);
   let newref = database.ref()
    newref.set(trainArray)
    renderCurrentschedule()

  }



}

//on sumbit event 
$(document).ready(function () {
  renderCurrentschedule()



  $(document).on("click", '#submit', function () {
    console.log('sumbit');
    console.log(id)
    id++
    let T = new Train(id);
    trainArray.push(T);
  });

  $(document).on('click',".Train", function(){
    let index = $(this).attr('id')
    id--;
    console.log("removing train");
    if(trainArray[index] !== undefined){
    trainArray[index].removeTrainFromDb(index);
    }
  });



});