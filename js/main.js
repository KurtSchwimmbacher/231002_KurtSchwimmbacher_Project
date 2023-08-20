// ===============================================================
// variables
const tripArr = [
    {
        name: "South East Asian Beach Cruise",
        picture: "../assets/trips/Ko Phi Phi of Thailand.jpg",
        destinations: "Thailand, Maldives, Seychelles",
        duration: "14 Days",
        departurePort: "Port Louis, Mauritius",
        price: 3534,
        roundTrip: "true"
    },
    {
        name: "Arctic Peninsula Cruise ",
        picture: "../assets/trips/seal explore.png",
        destinations: "Greenland, Iceland, Faroe Islands",
        duration: "15 Days",
        departurePort: "Oslo, Norway",
        price: 5847,
        roundTrip: "true"
    },
    {
        name: "Caribbean Islands Cruise",
        picture: "../assets/trips/carribean.jpg",
        destinations: "Cayman Islands, Barbados, Aruba",
        duration: "11 Days",
        departurePort: "Havana, Cuba",
        price: 3134,
        roundTrip: "true"
    },     
    {
        name: "African Cruise",
        picture: "../assets/trips/Africa Trip.png",
        destinations: "Namibia, Cape Verde, Angola ",
        duration: "13 Days",
        departurePort: "Cape Town, South Africa",
        price: 4934,
        roundTrip: "true"
    },
    {
        name: "Mediterranean Cruise",
        picture: "../assets/trips/Greece Trip.png",
        destinations: "Italy, Greece, Turkey",
        duration: "9 Days",
        departurePort: "Tel-Aviv, Isreal",
        price: 1834,
        roundTrip: "true"
    },
    {
        name: "Alaskan Cruise",
        picture: "../assets/trips/Alaska Trip.png",
        destinations: "Hubbard Glacier, Skagway, Juneau",
        duration: "9 Days",
        departurePort: "Oslo, Norway",
        price: 7789,
        roundTrip: "true"
    }
];




    let appliedFilter = "";
    let appliedSort = "date added";





// ==================================================================================================================================
// load all trips
function loadTrips (tripsToShow){

    // Clear all cards before loading plants again
    $("#tripContainer").empty();

    for(let i = 0; i < tripsToShow.length; i++){
        const currentTrip = tripsToShow[i];

        // ===============================================================
        // load trips on trip page

        // select the trip container and add trip array to it
        $("#tripContainer").append($("#tripCardTemplate").html());

        // Create a variable that contains the most recently added card
        let current = $("#tripContainer").children().eq(i);
        console.log(i);
        
        // Set the content for the current trip card from the trip array
        $(current).find("#tripName").text(currentTrip.name);
        $(current).find("#destination").text("Destinations: " + currentTrip.destinations);
        $(current).find("#duration").text("Duration: " + currentTrip.duration);
        $(current).find("#departure").text("Departure Port: " + currentTrip.departurePort);
        $(current).find("#price").text("Price: $" + currentTrip.price);
        $(current).find(".card-img-top").attr("src","../assets/" + currentTrip.picture);


    }

}



// =========================================================================================
// read value from Price Slider
function readSliderChange(){
    $("#fromSliderPrice").on('input',function(){
        let min = $("#fromSliderPrice").val();
        let max = $("#toSliderPrice").val();
        $("#showPrice").text("Price: $"+min +" - $"+max);
    });

    $("#toSliderPrice").on('input',function(){
        let min = $("#fromSliderPrice").val();
        let max = $("#toSliderPrice").val();
        $("#showPrice").text("Price: $"+min +" - $"+max);
    });

    $("#fromSliderDuration").on('input',function(){
        let minD = $("#fromSliderDuration").val();
        let maxD = $("#toSliderDuration").val();
        $("#showDur").text("Days: "+minD +" - "+maxD);
    });

    $("#toSliderDuration").on('input',function(){
        let minD = $("#fromSliderDuration").val();
        let maxD = $("#toSliderDuration").val();
        $("#showDur").text("Days: "+minD +" - "+maxD);
    });

}


function filterTrips(){
    let filteredSortedTrips= [];


    // filter by price
    // get range
    let min = $("#fromSliderPrice").val();
    let max = $("#toSliderPrice").val();
    console.log(min);
    console.log(max);
    // check for trips within price range
    filteredSortedTrips = tripArr.filter(trip =>trip.price > min && trip.price < max);

    console.log(filteredSortedTrips);
    
    loadTrips(filteredSortedTrips);
}

$(document).ready(function (){

    loadTrips(tripArr);

    // Filters dom manipulation
    let min = $("#fromSliderPrice").attr("value");
    let max = $("#toSliderPrice").attr("value");
    $("#showPrice").text("Price: $"+min +" - $"+max);

    // Filters dom manipulation
    let minD = $("#fromSliderDuration").attr("value");
    let maxD = $("#toSliderDuration").attr("value");
    $("#showDur").text("Days: "+minD +" - "+maxD);

    //update slider values to dom
    readSliderChange();


    // Apply filters to Cards
    $("#confirmBtn").click(function(){

        filterTrips();
        
        // filterSortPlants()
    });


});


