const url = "https://api.spacexdata.com/v2/launchpads";

d3.json(url).then(receivedData => console.log(receivedData));


d3.json(url).then(receivedData => console.log(receivedData.map(launch => launch.location.latitude)));

d3.json(url).then(receivedData => console.log(receivedData.map(launch => launch.location.longitude)));




