//Code to initialize Firebase. This is Gena's personal firebase config.
var config = {
    apiKey: "AIzaSyA3Pk4gBYPf1qhIMbkKhrsKdIfOjAgdmTo",
    authDomain: "myfirstfirebase-1e9bc.firebaseapp.com",
    databaseURL: "https://myfirstfirebase-1e9bc.firebaseio.com",
    projectId: "myfirstfirebase-1e9bc",
    storageBucket: "myfirstfirebase-1e9bc.appspot.com",
    messagingSenderId: "823013425463"
  };

//Initializes Firebase using the configuration from Mateo
firebase.initializeApp(config);

//Initialized variables for use through
var database = firebase.database();
var current_name = "";
var current_destination = "";
var frequency = "";
var current_arrival = "";
var first_time = "";


//Event listener that runs function upon clicking submit.
$('#add-train').on('click', function(){

  //Prevents the page from reloading.
  event.preventDefault();

  //Gets the inputted values for the employees from the form and increments
  //employee count.
  current_name = $('#name-input').val();
  current_destination = $('#destination-input').val();
  frequency = $('#frequency-input').val();
  first_time = $('#first-time-input').val();

  //Pushes the individual entry to the database. Push adds it as one 
  //item with a single unique id.
  database.ref().push({

    name: current_name,
    destination: current_destination,
    frequency: frequency,
    time: first_time,

  });
});

//Displays the new train upon being added. Takes only a snapshot of the 
//added child.
database.ref().on('child_added', function(child_snapshot){

  //Gets the snapshot values.
  current_name = child_snapshot.val().name;
  current_destination = child_snapshot.val().destination;
  frequency = child_snapshot.val().frequency;
  first_time = child_snapshot.val().time;

  //Creates the table row
  var table_row = $('<tr>');

  //Creates the name column.
  var name_col = $('<td>').text(current_name);
  name_col.attr('id', 'name');
  table_row.append(name_col);

  //Creates the destination column.
  var destination_col = $('<td>').text(current_destination);
  destination_col.attr('id', 'destination');
  table_row.append(destination_col);

  //Creates the frequency column.
  var frequency_col = $('<td>').text(frequency);
  frequency_col.attr('id', 'frequency');
  table_row.append(frequency_col);

  //Creates the next arrival column.
  var next_arrival = moment(first_time, "HH:mm").add(frequency, "minutes");
  var arrival_col = $('<td>').text(moment(next_arrival).format("HH:mm"));
  table_row.append(arrival_col);
  console.log(moment(first_time, "HH:mm"));
  console.log(moment(next_arrival));
  console.log(moment(frequency, "mm"))

  //Creates the minutes away column.
  var now = new Date();
  var now_wrapper = moment(now);
  var start_wrapper = moment(next_arrival);
  var minutes_away = moment().to(next_arrival, "HH:mm");
  var minutes_away_col = $('<td>').text(moment(minutes_away));
  minutes_away_col.attr('id', 'minutes-away');
  table_row.append(minutes_away_col);
  console.log(minutes_away)

  //Appends entire row to the table.
  $('#train-table').append(table_row);

}, function(errorObject){

    console.log("The read failed: " + errorObject.code);

});