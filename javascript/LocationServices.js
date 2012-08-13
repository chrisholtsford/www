var serviceURL = "http://brodownandcrunchcode.com/Location/";
var radius = "1000"
var events;

function popup() {
    alert("Hello World")
} 

// onSuccess Callback
//   This method accepts a `Position` object, which contains
//   the current GPS coordinates
//
function onSuccess2(position) {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
    'Longitude: '          + position.coords.longitude             + '<br />' +
    'Altitude: '           + position.coords.altitude              + '<br />' +
    'Accuracy: '           + position.coords.accuracy              + '<br />' +
    'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
    'Heading: '            + position.coords.heading               + '<br />' +
    'Speed: '              + position.coords.speed                 + '<br />' +
    'Timestamp: '          + new Date(position.timestamp)          + '<br />' +
    'this is working';
    
}




function onSuccess(position){
    var service = serviceURL + position.coords.latitude.toString() + "/" + position.coords.longitude.toString() + "/" + radius;
    alert(service)


    $.getJSON(service,function(data){
        
        //alert(data)
        //alert(data.item)
        
        $('#eventList li').remove();
        
        events = data.items;
        var stuff = "";
        $.each(events, function(index,event){
            stuff = event.VenueName
            $('#eventList').append('<li>' +'Venue: ' + event.VenueName + ', ' + event.City +'</li>');
        });
        alert(stuff)
        
        $('#eventList').listview('refresh');
    
    })
    .success(function(){alert("success");})
    .error(function(jqXHR, textStatus, errorThrown){
        alert("error " + textStatus);
        alert("incoming text " + jqXHR.responseText);
    })
    .complete(function(){alert("complete");});
}

function getLocation(){
    
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

$('#eventListPage').bind('pageinit',function(event){
    
    getLocation(); 
});

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
    'message: ' + error.message + '\n');
}


