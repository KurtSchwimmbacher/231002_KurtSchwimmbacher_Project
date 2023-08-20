// ================================================================================================
// variables
const tripArr = [
    {
        name: "South East Asian Beach Cruise",
        picture: "../assets/trips/Ko Phi Phi of Thailand.jpg",
        destinations: "Thailand, Maldives, Seychelles",
        duration: 14,
        departurePort: "Port Louis, Mauritius",
        price: 3534,
        roundTrip: true
    },
    {
        name: "Arctic Peninsula Cruise",
        picture: "../assets/trips/seal explore.png",
        destinations: "Greenland, Iceland, Faroe Islands",
        duration: 4,
        departurePort: "Oslo, Norway",
        price: 5847,
        roundTrip: true
    },
    {
        name: "Caribbean Islands Cruise",
        picture: "../assets/trips/carribean.jpg",
        destinations: "Cayman Islands, Barbados, Aruba",
        duration: 6,
        departurePort: "Havana, Cuba",
        price: 3134,
        roundTrip: true
    },     
    {
        name: "African Cruise",
        picture: "../assets/trips/Africa Trip.png",
        destinations: "Namibia, Cape Verde, Angola",
        duration: 13,
        departurePort: "Cape Town, South Africa",
        price: 4934,
        roundTrip: false
    },
    {
        name: "Mediterranean Cruise",
        picture: "../assets/trips/Greece Trip.png",
        destinations: "Italy, Greece, Turkey",
        duration: 9,
        departurePort: "Tel-Aviv, Isreal",
        price: 1834,
        roundTrip: true
    },
    {
        name: "Alaskan Cruise",
        picture: "../assets/trips/Alaska Trip.png",
        destinations: "Hubbard Glacier, Skagway, Juneau",
        duration: 21,
        departurePort: "Oslo, Norway",
        price: 7789,
        roundTrip: false
    }
];


    let appliedSort = "date added";
// ================================================================================================




// ================================================================================================
// load all trips
function loadTrips (tripsToShow){

    // Clear all cards before loading trips again
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
// ================================================================================================


// =========================================================================================
// read value from Price Slider
function readSliderChange(){
    // price slider dom manipulation
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

    // duration slider dom manipulation
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

    // departure port dom manipulation
    $("#departurePort").on('change',function(){
        if($('#departurePort option:selected').val() === "Select A Port From Below"){
            $("#showDep").text("Departure Port:");
        }
        else{
            $("#showDep").text("Departure Port: "+$('#departurePort option:selected').val());
        }
    });

    // destinations dom manipulation
    $("#destinations").on('change',function(){
        if($('#destinations option:selected').val() === "Select A Port From Below"){
            $("#showDep").text("Destinations:");
        }
        else{
            $("#showDest").text("Destinations: "+$('#destinations option:selected').val());
        }
    });

}
// ================================================================================================

// ================================================================================================
function filterTrips(){
    let filteredSortedTrips= [];

    // get filter amounts
    // filter by price
    let min = $("#fromSliderPrice").val();
    let max = $("#toSliderPrice").val();
    // Filter by day
    let minD = $("#fromSliderDuration").val();
    let maxD = $("#toSliderDuration").val();
    // Filter by Departure Port
    let departurePort = $('#departurePort option:selected').val();
    // Filter by Departure Port
    let destinations = $('#destinations option:selected').val();
    //Filter by round trip
    let roundTrip = $("#roundTripCheckBox").is(":checked");

    console.log(roundTrip);

    //round trip false
    if(departurePort === "Select A Port From Below" && destinations === "Select A Port From Below" && roundTrip === false){
        // check for trips that fit all requirements
        filteredSortedTrips = tripArr.filter(trip =>trip.price > min && trip.price < max && trip.duration > minD && trip.duration < maxD && trip.roundTrip === false);
    }
    else if(departurePort != "Select A Port From Below" && destinations === "Select A Port From Below" && roundTrip === false){
        // check for trips that fit all requirements
        filteredSortedTrips = tripArr.filter(trip =>trip.price > min && trip.price < max && trip.duration > minD && trip.duration < maxD && trip.departurePort === departurePort && trip.roundTrip === false);
    }
    else if(destinations != "Select A Port From Below" && departurePort === "Select A Port From Below" && roundTrip === false){
        // check for trips that fit all requirements
        filteredSortedTrips = tripArr.filter(trip =>trip.price > min && trip.price < max && trip.duration > minD && trip.duration < maxD && trip.destinations === destinations && trip.roundTrip === false);
    }
    else if(destinations != "Select A Port From Below" && departurePort != "Select A Port From Below" && roundTrip === false){
         // check for trips that fit all requirements
         filteredSortedTrips = tripArr.filter(trip =>trip.price > min && trip.price < max && trip.duration > minD && trip.duration < maxD && trip.destinations === destinations && trip.departurePort === departurePort && trip.roundTrip === false);
    }
    
    // round trip true
    else if(departurePort === "Select A Port From Below" && destinations === "Select A Port From Below" && roundTrip === true){
        // check for trips that fit all requirements
        console.log("round trip: "+roundTrip)
        filteredSortedTrips = tripArr.filter(trip =>trip.price > min && trip.price < max && trip.duration > minD && trip.duration < maxD && trip.roundTrip === true);
    }
    else if(departurePort != "Select A Port From Below" && destinations === "Select A Port From Below" && roundTrip === true){
        // check for trips that fit all requirements
        console.log("round trip: "+roundTrip)
        filteredSortedTrips = tripArr.filter(trip =>trip.price > min && trip.price < max && trip.duration > minD && trip.duration < maxD && trip.departurePort === departurePort && trip.roundTrip === true);
    }
    else if(destinations != "Select A Port From Below" && departurePort === "Select A Port From Below" && roundTrip === true){
        // check for trips that fit all requirements
        console.log("round trip: "+roundTrip)
        filteredSortedTrips = tripArr.filter(trip =>trip.price > min && trip.price < max && trip.duration > minD && trip.duration < maxD && trip.destinations === destinations && trip.roundTrip === true);
    }
    else if(destinations != "Select A Port From Below" && departurePort != "Select A Port From Below" && roundTrip === true){
         // check for trips that fit all requirements
         console.log("round trip: "+roundTrip)
         filteredSortedTrips = tripArr.filter(trip =>trip.price > min && trip.price < max && trip.duration > minD && trip.duration < maxD && trip.destinations === destinations && trip.departurePort === departurePort && trip.roundTrip === true);
    }

    console.log(filteredSortedTrips);
    loadTrips(filteredSortedTrips);
}
// ================================================================================================

// Document Ready
$(document).ready(function (){

    loadTrips(tripArr);

// ================================================================================================
    $(".open-filters").hide();
    // Close Filter Section
    $(".close-filters").click(function(){
        $("#filterClose").slideUp(800);
        $(".close-filters").toggle(1200);
        $(".open-filters").toggle(1200);
    });

    // open Filter Section
    $(".open-filters").click(function(){
        $("#filterClose").slideDown(800);
        $(".close-filters").toggle(1200);
        $(".open-filters").toggle(1200);
    });
// ================================================================================================

// ================================================================================================
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
    });

      // Remove filters to Cards
      $("#removeBtn").click(function(){
        $("#showDest").text("Destinations: ");
        $("#showDep").text("Departure Port: ");
        $("#destinations").prop('selectedIndex',0);
        $("#departurePort").prop('selectedIndex',0);
        loadTrips(tripArr);
    });
// ================================================================================================

});


