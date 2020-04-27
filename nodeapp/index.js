async function busy_hours(place_id, key) {
  if (!(place_id && key)) {
    return { status: "error", message: "Place ID / API key missing" };
  }

  /*const gmaps = require('@google/maps').createClient({
        key: key,
        Promise: Promise
    });*/

  const format_output = (array) => {
    return {
      hour: array[0],
      percentage: array[1],
    };
  };

  const extract_data = (html) => {
    console.log("extracting data");
    // ACHTUNG! HACKY AF
    let str = ["APP_INITIALIZATION_STATE=", "window.APP_FLAGS"],
      script = html.substring(
        html.lastIndexOf(str[0]) + str[0].length,
        html.lastIndexOf(str[1])
      );
    console.log("script", script);
    // LET'S PARSE THAT MOFO
    let first = eval(script);
    console.log("first", first);
    let second = eval(first[3][6].replace(")]}'", ""));
    console.log("second", JSON.stringify(second, null, 2));
    console.log("trying to get result");

    //let result = second[0][1][0][14][84];
    let result = second[1][1][0][14][84];
    console.log("result =", result);
    return result;
  };

  const process_html = (html) => {
    console.log("processing html");
    const popular_times = extract_data(html);
    console.log("completed extraction");
    if (!popular_times) {
      return { status: "error", message: "Place has no popular hours" };
    }

    const data = { status: "ok" };
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    data.week = Array.from(Array(7).keys()).map((index) => {
      let hours = [];
      if (popular_times[0][index] && popular_times[0][index][1]) {
        hours = Array.from(popular_times[0][index][1]).map((array) =>
          format_output(array)
        );
      }
      return {
        day: weekdays[index],
        hours: hours,
      };
    });
    const crowded_now = popular_times[7];

    if (crowded_now !== undefined) {
      data.now = format_output(crowded_now);
    }
    return data;
  };

  const fetch_html = async (url) => {
    try {
      console.log("fetching html", url);
      const html = await axios({
        url: url,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36",
        },
      });
      return html.data;
    } catch (err) {
      return { status: "error", message: "Invalid url" };
    }
  };

  try {
    //const place = await gmaps.place({placeid: place_id}).asPromise();

    var map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -33.866, lng: 151.196 },
      zoom: 15,
    });

    var request = {
      placeId: "ChIJc6bLH08BdkgRx4mUhnTMxlc",
      //'ChIJN1t_tDeuEmsRUsoyG83frY4',
      fields: ["name", "formatted_address", "place_id", "geometry", "url"],
    };

    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    service.getDetails(request, function (place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        /*var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
              });
              google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                  'Place ID: ' + place.place_id + '<br>' +
                  place.formatted_address + '</div>');
                infowindow.open(map, this);
              });*/
        console.log(place);
        fetch_html(place.url).then(html => {
            return Object.assign(
              { name, formatted_address, location: place.geometry.location },
              process_html(html)
            );
        });
      }
    });
  } catch (err) {
    return { status: "error", message: "Error: " + err.json || err };
  }
}

function processResult(data) {
  console.log(data);
}

function initMap() {
  //debugger;
  busy_hours(
    "ChIJ3wbVCJYAdkgRf0Pa8FfG4eU",
    "APIKey"
  )
    .then((data) => {
      processResult(data);
    })
    .catch((error) => console.log(error));
}
