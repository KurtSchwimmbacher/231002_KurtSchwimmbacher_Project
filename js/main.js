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
        addedDate: "2023-06-3",
        roundTrip: true
    },
    {
        name: "Arctic Peninsula Cruise",
        picture: "../assets/trips/seal explore.png",
        destinations: "Greenland, Iceland, Faroe Islands",
        duration: 4,
        departurePort: "Oslo, Norway",
        price: 5847,
        addedDate: "2023-01-22",
        roundTrip: true
    },
    {
        name: "Caribbean Islands Cruise",
        picture: "../assets/trips/carribean.jpg",
        destinations: "Cayman Islands, Barbados, Aruba",
        duration: 6,
        departurePort: "Havana, Cuba",
        price: 3134,
        addedDate: "2023-08-30",
        roundTrip: true
    },     
    {
        name: "African Cruise",
        picture: "../assets/trips/Africa Trip.png",
        destinations: "Namibia, Cape Verde, Angola",
        duration: 13,
        departurePort: "Cape Town, South Africa",
        price: 4934,
        addedDate: "2023-05-17",
        roundTrip: false
    },
    {
        name: "Mediterranean Cruise",
        picture: "../assets/trips/Greece Trip.png",
        destinations: "Italy, Greece, Turkey",
        duration: 9,
        departurePort: "Tel-Aviv, Isreal",
        price: 1834,
        addedDate: "2023-02-12",
        roundTrip: true
    },
    {
        name: "Alaskan Cruise",
        picture: "../assets/trips/Alaska Trip.png",
        destinations: "Hubbard Glacier, Skagway, Juneau",
        duration: 21,
        departurePort: "Oslo, Norway",
        price: 7789,
        addedDate: "2023-05-05",
        roundTrip: false
    },
    {
        name: "Greece Cruise",
        picture: "../assets/trips/Greece Trip.png",
        destinations: "Athens Greece",
        duration: 9,
        departurePort: "Tel-Aviv, Isreal",
        price: 600,
        addedDate: "2023-07-22",
        roundTrip: false
    }
];


    let appliedSort = "date added";
    let appliedFilter = "";

    let orderedTrips =[];
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
        
        // Set the content for the current trip card from the trip array
        $(current).find("#tripName").text(currentTrip.name);
        $(current).find("#destination").text("Destinations: " + currentTrip.destinations);
        $(current).find("#duration").text("Duration: " + currentTrip.duration);
        $(current).find("#departure").text("Departure Port: " + currentTrip.departurePort);
        $(current).find("#price").text("Price: $" + currentTrip.price);
        $(current).find(".card-img-top").attr("src","../assets/" + currentTrip.picture);
        if(currentTrip.roundTrip){
            $(current).find("#roundTrip").text("Roundtrip: yes")
        }
        else{
            $(current).find("#roundTrip").text("Roundtrip: no")
        }

        $(current).find(".ticket-number").hide();
        $(current).find("#bookTrip").hide();
        
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
function advancedFilterTrips(){
    let filteredSortedTrips= [];

    // advanced filters
    // ================================================================================================
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
    // ================================================================================================


    // call load trips function with sorted array parameter
    loadTrips(filteredSortedTrips);
}
// ================================================================================================


// ================================================================================================
function basicFilterSortTrips(){
    let filterSortTripArr = [];

        //Filter Trips
        if(appliedFilter){
            if(appliedFilter == "short"){
                filterSortTripArr = tripArr.filter(trip =>trip.duration < 6);
            }
            else if(appliedFilter == "long"){
                filterSortTripArr = tripArr.filter(plant =>plant.duration > 5);
            }
            else if(appliedFilter == "single"){
                filterSortTripArr = tripArr.filter(plant =>plant.destinations.split(",").length === 1);
            }
            else if(appliedFilter == "multi"){
                filterSortTripArr = tripArr.filter(plant =>plant.destinations.split(",").length > 1);
            }
            else if(appliedFilter == "row"){
                arr = tripArr.sort(function (a, b) { 
                     return b - a; 
                });
                filterSortTripArr = arr.slice(Math.max(arr.length - 5, 0))
            }
            else{
                filterSortTripArr = tripArr.filter(plant =>plant.lightAmount == appliedFilter);
            }
        }   
        else{
            filterSortTripArr = tripArr;
        }

        if(appliedSort){
            if(appliedSort === "low to high"){
                // sort by price
                filterSortTripArr = tripArr.sort((a,b) =>{
                    return a.price -b.price;    
                });
            }
            else if(appliedSort === "alphabetically"){
                // sort by alphabetically, a to z
                filterSortTripArr = tripArr.sort((a,b) =>{
                    return a.name.localeCompare(b.name);    
                });
            }
            else if(appliedSort === "date added"){
                // sort by date added
                filterSortTripArr = tripArr.sort((a,b) =>{
                    let da = new Date(a.addedDate);
                    let db = new Date(b.addedDate);
                    
                    return db-da;
                });
            }
        }

        


        loadTrips(filterSortTripArr);
}



function recalcTotals(){
    let priceDisp = $(".total-price");
    let tickDisp = $(".total-tickets");
    let totalPrice = 0;
    let totalTickets = 0;

    // get price

    //filters out all the children cards to get just their price
    let priceArr = $("#loadedTrips").children().find("#priceTotal").text().split("$");
    for(let i = 1; i<priceArr.length;i++){
        priceArr[i-1] = priceArr[i];
    }
    // remove the last entry because its a duplicate
    priceArr.pop();
    //filter array for just the price values
    let newPA = [];
    for(let i = 0;i<priceArr.length;i++){
        let tempArr = priceArr[i].split("T");
        newPA[i] = tempArr[0];
    }
    // loop through and convert to ints and add up prices
    for(let i = 0; i <newPA.length;i++){
        newPA[i] = parseInt(newPA[i].substring(0,1)+newPA[i].substring(2));
        totalPrice+= newPA[i];
    }

    // display new total price
    priceDisp.text("Total Price: $" +formatFinalPrice(totalPrice+""));

    // get tickets

    // split into smaller chunks
    let ticketArr = $("#loadedTrips").children().find("#tickets").text().split(":");
    for(let i = 1; i<ticketArr.length;i++){
        ticketArr[i-1] = ticketArr[i];
    }
    // remove last entry because its a duplicate
    ticketArr.pop();

    // filter array for just ticket values
    let newTA = [];
    for(let i = 0;i<ticketArr.length;i++){
        let tempArr = ticketArr[i].split("N");
        newTA[i] = tempArr[0];
    }
    // convert them to intergers and add them up
    for(let i = 0; i <newTA.length;i++){
        newTA[i] = parseInt(newTA[i]);
        totalTickets+= newTA[i];
    }
    
    // display new total tickets
    tickDisp.text("Total Number of Tickets: "+totalTickets);
}


// ================================================================================================


// Thailand Weather
// ================================================================================================
let cloudIcon = '';
$.ajax({
    type:"GET",
    url:"https://api.openweathermap.org/data/2.5/weather?q=Phuket&appid=8759d43fce621bb6239387dec2630ce5&units=metric",
    success: function(data){
        temp = data;

        
        let rainfall = 0.13;

        if(temp.rain === undefined){
            if(temp.clouds.all < 30){
                cloudIcon ='<img src="assets/weather/cloud-sun-alt-svgrepo-com.svg" style="width: 24px;">';
            }
            else if(temp.clouds.all > 30 && temp.clouds.all < 70){
                cloudIcon ='<img src="assets/weather/cloud-svgrepo-com.svg" style="width: 24px;">';
            }
            else if(temp.clouds.all > 70){
                cloudIcon ='<img src="assets/weather/clouds-svgrepo-com.svg" style="width: 24px;">';
            }
        }
        else if(temp.rain != undefined){
            if(rainfall < 2){
                cloudIcon ='<img src="assets/weather/cloud-rain-alt-svgrepo-com.svg" style="width: 24px;">';
            }
            else if(rainfall > 2){
                cloudIcon ='<img src="assets/weather/cloud-rain-alt-1-svgrepo-com.svg" style="width: 24px;">';
            }
        }
        
    }
}).done(function(){
    $("#cloudInfoThai").html(cloudIcon);
    $("#weatherInfoThai").text(temp.main.temp+ "°C");
});
// ================================================================================================
// Greece Weather
// ================================================================================================
let cloudIconG = '';
$.ajax({
    type:"GET",
    url:"https://api.openweathermap.org/data/2.5/weather?q=Athens&appid=8759d43fce621bb6239387dec2630ce5&units=metric",
    success: function(data){
        temp = data;
        

        if(temp.rain === undefined){
            if(temp.clouds.all < 30){
                cloudIconG ='<img src="assets/weather/cloud-sun-alt-svgrepo-com.svg" style="width: 24px;">';
            }
            else if(temp.clouds.all > 30 && temp.clouds.all < 70){
                cloudIconG ='<img src="assets/weather/cloud-svgrepo-com.svg" style="width: 24px;">';
            }
            else if(temp.clouds.all > 70){
                cloudIconG ='<img src="assets/weather/clouds-svgrepo-com.svg" style="width: 24px;">';
            }
        }
        else if(temp.rain != undefined){
            if(rainfall < 2){
                cloudIconG ='<img src="assets/weather/cloud-rain-alt-svgrepo-com.svg" style="width: 24px;">';
            }
            else if(rainfall > 2){
                cloudIconG ='<img src="assets/weather/cloud-rain-alt-1-svgrepo-com.svg" style="width: 24px;">';
            }
        }
        
    }
}).done(function(){
    $("#cloudInfoGreece").html(cloudIconG);
    $("#weatherInfoGreece").text(temp.main.temp+ "°C");
});
// ================================================================================================
// Alaska Weather
// ================================================================================================
let cloudIconA = '';
$.ajax({
    type:"GET",
    url:"https://api.openweathermap.org/data/2.5/weather?q=Anchorage&appid=8759d43fce621bb6239387dec2630ce5&units=metric",
    success: function(data){
        temp = data;

        // if(temp.rain === undefined){
            if(temp.clouds.all < 30){
                cloudIconA ='<img src="assets/weather/cloud-sun-alt-svgrepo-com.svg" style="width: 24px;">';
            }
            else if(temp.clouds.all > 30 && temp.clouds.all < 70){
                cloudIconA ='<img src="assets/weather/cloud-svgrepo-com.svg" style="width: 24px;">';
            }
            else if(temp.clouds.all > 70){
                cloudIconA ='<img src="assets/weather/clouds-svgrepo-com.svg" style="width: 24px;">';
            }
        //}
        // else if(temp.rain != undefined){
        //     if(rainfall < 2){
        //         cloudIconA ='<img src="assets/weather/cloud-rain-alt-svgrepo-com.svg" style="width: 24px;">';
        //     }
        //     else if(rainfall > 2){
        //         cloudIconA ='<img src="assets/weather/cloud-rain-alt-1-svgrepo-com.svg" style="width: 24px;">';
        //     }
        // }
        
    }
}).done(function(){
    $("#cloudInfoAlaska").html(cloudIconA);
    $("#weatherInfoAlaska").text(temp.main.temp+ "°C");
});
// ================================================================================================



// store trips into local storage
// ================================================================================================
storeTrip = (tripArr) =>{
    let tripData = JSON.stringify(tripArr);
    localStorage.setItem("TripBooking",tripData);
}
// ================================================================================================

// load trips from local storage
// ================================================================================================
loadTripsCheckout = () =>{
        let tripData = JSON.parse(localStorage.getItem("TripBooking"));
        let dispPrice = $(".total-price");
        let dispTickets = $(".total-tickets");
    
        let totalPrice = 0;
        let totalTickets = 0;

        $(".loaded-trips-con").empty();

        for(let i = 0; i < tripData.length; i++){
            const bookedTrip = tripData[i];
    
            // ===============================================================
            // load trips on trip page
    
            // select the trip container and add trip array to it
            $("#loadedTrips").append($("#bookedTripTemplate").html());
    
            // Create a variable that contains the most recently added card
            let current = $("#loadedTrips").children().eq(i);
            
            // Set the content for the current trip card from the trip array
            $(current).find("#tripName").text(bookedTrip.name);
            $(current).find("#destination").text(bookedTrip.destinations);
            $(current).find("#duration").text(bookedTrip.duration + " Days");
            $(current).find("#departure").text(bookedTrip.departurePort);

            let pr = bookedTrip.price+"";
            $(current).find("#price").text("Price per passenger: $" + formatFinalPrice(pr));
            $(current).find("#tickets").text("Number of tickets: " + bookedTrip.tickets);

            let tote =(bookedTrip.price*bookedTrip.tickets)+"";
            $(current).find("#priceTotal").text("Total Price: $" +formatFinalPrice(tote));
            $(current).find(".table-img").attr("src",bookedTrip.picture);  
       

            totalPrice += (bookedTrip.price*bookedTrip.tickets);
            totalTickets += parseInt(bookedTrip.tickets);      
    }
    let priceAdj = ""+totalPrice;
    dispPrice.text("Total Price: $"+ formatFinalPrice(priceAdj));
    dispTickets.text("Total Number of tickets: "+totalTickets);

    
}
// ================================================================================================

// formats prices
formatFinalPrice =(priceAdj)=>{
    return priceAdj.replace(/(.)(?=(\d{3})+$)/g,'$1 ');
}


// restore after purchase button
// ================================================================================================
returnDefault = () =>{
    localStorage.removeItem("TripBooking");
    window.location.href = "../index.html";
}
// ================================================================================================

// ================================================================================================
// Document Ready
$(document).ready(()=>{

// home page dynamic h1
$(".dynamic-head").text("Welcome To Your Holiday");

$(".dynamic-head").on('mouseenter',function(){
    $(".dynamic-head").text("Your Cruise Link Journey Awaits");
});
$(".dynamic-head").on('mouseleave',function(){
    $(".dynamic-head").text("Welcome To Your Holiday");
});

    loadTrips(tripArr);
    
    $(".btn-dark").hide();
    $(".ticket-number").hide();

   
   // card on click
   // ================================================================================================
       $("#tripContainer").on('click','.card-img-top',function(){
           $(this).parent().find('#duration').toggle();
           $(this).parent().find("#departure").toggle();
   
           $(this).parent().find(".ticket-number").toggle();
           $(this).parent().find("#bookTrip").toggle();
           $(this).parent().find("#roundTrip").toggle();

           $(this).parent().toggleClass("alternate");
           $(this).toggleClass("small");
   
       });
    // ================================================================================================



       $(".btn-dark").on('click',function(){

        // add an on click state to button
        $(this).text("Tickets Booked!");
        $(this).toggleClass("clicked");

            // name
            let objName = $(this).parent().find("#tripName").text();

            // image
            let img = $(this).parent().parent().find(".card-img-top").attr('src');
            // let img = $(this).closest('img').attr('src');

            // destinations
            let objDest = $(this).parent().find("#destination").text();

            // duration
            let objDur = $(this).parent().find("#duration").text();

            // departure
            let objDep = $(this).parent().find("#departure").text();

            // get the price
            let priceArr = $(this).parent().find("#price").text().split("$");
            let objPrice = priceArr[1];
                    
            // get number of tickets
            let objTickets = $(this).parent().find("#ticketNum").val();

        //roundtrip still needed

        let tripObj ={
            name: objName,
            picture: img,
            destinations: objDest,
            duration: objDur,
            departurePort: objDep,
            price: objPrice,
            roundTrip: true,
            tickets: objTickets
        }

        orderedTrips.push(tripObj);

    

        storeTrip(orderedTrips);
       });




    // Change Logo on Hover Home Page
// ================================================================================================
    $(".navbar-brand").on("mouseenter", function(){
        $("#imgLogo").attr("src","assets/Logo Hover.svg");
    });

    $(".navbar-brand").on("mouseleave", function(){
        $("#imgLogo").attr("src","assets/Logo Main.svg");
    });
// ================================================================================================

    // Change Logo on Hover Other Pages
// ================================================================================================
$(".trips-hover").on("mouseenter", function(){
    $("#imgLogo").attr("src","../assets/Logo Hover.svg");
});

$(".trips-hover").on("mouseleave", function(){
    $("#imgLogo").attr("src","../assets/Logo Main.svg");
});
// ================================================================================================

// ================================================================================================
    
    $(".close-filters").hide();
    $("#filterClose").hide();
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

        advancedFilterTrips();
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

// Filter buttons
// ================================================================================================
    $("input[name= 'filterRadio']").click(function(){
        appliedFilter = $(this).attr('value');

        basicFilterSortTrips();
    });


    $("input[name = 'sortRadio']").click( function(){
        appliedSort = $(this).attr('value');
        console.log(appliedSort);
        basicFilterSortTrips();
    });
// ================================================================================================


// save tickets to checkout page
// add readme from week 7 add link to demo video in readme

// ================================================================================================
// Checkout page

loadTripsCheckout();


// remove trip when remove is clicked
$("#loadedTrips").on('click','.remove', function (){
    //remove selected row from the table     
    let findName = $(this).parent().find("#tripName").text();
    let data = JSON.parse(localStorage.getItem("TripBooking"));
    for(let i = 0; i <data.length;i++){
        if(data[i].name === findName){
            data.splice(i,1);
        }
    }
    localStorage.removeItem("TripBooking");
    storeTrip(data);
    
    $(this).parent().remove();
    recalcTotals();
});


// remove all trips from checkout page
$("#removeAll").on('click',function(){
    localStorage.removeItem("TripBooking");

    $("#loadedTrips").empty();

    recalcTotals();
});



});





