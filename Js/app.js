var x = document.getElementById("demo");
var key = config.key;
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  x.innerHTML = lat + "," + lon;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      fn1(data);
    })
    .catch((e) => {
      console.log("Error loading the page", e);
    });
}
function fn1(data){
    console.log(data);
    var tbody = document.getElementById('tbody');
    var weath= document.getElementById('weath');
    var temp= document.getElementById('temp');
    var wind= document.getElementById('wind');
    var loc= document.getElementById('loc');
    document.getElementById('t1').innerHTML="<th>Weather</th>";
    document.getElementById('t2').innerHTML="<th>Temp</th>";
    document.getElementById('t3').innerHTML="<th>Wind</th>";
    document.getElementById('t4').innerHTML="<th>Location</th>";
    var tr = `<tr><td>${data.weather[0].description}</td></tr>`
    weath.innerHTML=tr;

}
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred.";
      break;
  }
}