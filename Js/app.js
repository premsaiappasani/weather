var x = document.getElementById("demo");
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
  x.innerHTML = "( "+lat + "," + lon+" )";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=03726f5cd722d41eadd473bf9a6331d2&units=metric`
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
    var city = document.getElementById("city");
    var tbody = document.getElementById('tbody');
    var weath= document.getElementById('weath');
    var temp= document.getElementById('temp');
    var wind= document.getElementById('wind');
    var loc= document.getElementById('loc');
    city.innerText=data.name;
    var img = document.createElement('img');
    img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.getElementById('imgspan').appendChild(img);
    document.getElementById('desc').innerHTML=`${data.weather[0].description}`;
    document.getElementById('t1').innerHTML="<th>Weather</th>";
    document.getElementById('t2').innerHTML="<th>Temperature</th>";
    document.getElementById('t3').innerHTML="<th>Wind</th>";
    document.getElementById('t4').innerHTML="<th>Other Parameters</th>";
    var tr = `<tr><td>${data.name}</td></tr><tr><td>${data.weather[0].main}</td></tr>`
    weath.innerHTML=tr;
    tr=`<tr><td>Temperature-${data.main.temp}&deg;C</td></tr><tr><td>Feels like ${data.main.feels_like}&deg;C</td></tr>`;
    temp.innerHTML=tr;
    tr=`<tr><td>Wind speed-${data.wind.speed}</td></tr><tr><td>Angle-${data.wind.deg}</td></tr>`;
    wind.innerHTML=tr;
    tr=`<tr><td>Pressure-${data.main.pressure}</td></tr><tr><td>Humidity-${data.main.humidity}</td>`;
    loc.innerHTML=tr;
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
