// ===============================================================
// variables
const tripArr = [
    {
        name: "South East Asian Beach Cruise",
        picture: "../assets/trips/Ko Phi Phi of Thailand.jpg",
        destinations: "Thailand, Maldives, Seychelles",
        duration: "14 Days",
        departurePort: "Port Louis, Mauritius",
        price: "$3 534",
        roundTrip: "true"
    },
    {
        name: "Arctic Peninsula Cruise ",
        picture: "../assets/trips/seal explore.png",
        destinations: "Greenland, Iceland, Faroe Islands",
        duration: "15 Days",
        departurePort: "Oslo, Norway",
        price: "$5 847",
        roundTrip: "true"
    },
    {
        name: "Caribbean Islands Cruise",
        picture: "../assets/trips/carribean.jpg",
        destinations: "Cayman Islands, Barbados, Aruba",
        duration: "11 Days",
        departurePort: "Havana, Cuba",
        price: "$3 134",
        roundTrip: "true"
    },     
    {
        name: "African Cruise",
        picture: "../assets/trips/Africa Trip.png",
        destinations: "Namibia, Cape Verde, Angola ",
        duration: "13 Days",
        departurePort: "Cape Town, South Africa",
        price: "$4 934",
        roundTrip: "true"
    },
    {
        name: "Mediterranean Cruise",
        picture: "../assets/trips/Greece Trip.png",
        destinations: "Italy, Greece, Turkey",
        duration: "9 Days",
        departurePort: "Tel-Aviv, Isreal",
        price: "$1 834",
        roundTrip: "true"
    },
    {
        name: "Alaskan Cruise",
        picture: "../assets/trips/Alaska Trip.png",
        destinations: "Hubbard Glacier, Skagway, Juneau",
        duration: "9 Days",
        departurePort: "Oslo, Norway",
        price: "$7 789",
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

    for(let i = 0; i < tripArr.length; i++){
        const currentTrip = tripArr[i];

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
        $(current).find("#price").text("Price: " + currentTrip.price);
        $(current).find(".card-img-top").attr("src","../assets/" + currentTrip.picture);


    }

}

$(document).ready(function (){

    loadTrips(tripArr);




});