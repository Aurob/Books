function left(){
    day = document.getElementById('day').value
    console.log('left');
    document.getElementById('info').innerHTML= new Date();
    fetch('https://api.nasa.gov/planetary/earth/imagery/?lon=100.75&lat=1.5&date=2017-'+(day-1)+'-01&cloud_score=True&api_key=DEMO_KEY')
            .then(function(response) {
            return response.json();
        }).then(function(myJson) {
        url = JSON.stringify(myJson.url).replace('"','').replace('"','');
        document.getElementById('img').src = url;
    });
    day = day-1;
}
function right(){
    day = document.getElementById('day').value
    console.log('right');
    document.getElementById('info').innerHTML= new Date();
    fetch('https://api.nasa.gov/planetary/earth/imagery/?lon=100.75&lat=1.5&date=2017-'+(day+1)+'-01&cloud_score=True&api_key=DEMO_KEY')
            .then(function(response) {
            return response.json();
        }).then(function(myJson) {
        url = JSON.stringify(myJson.url).replace('"','').replace('"','');
        document.getElementById('img').src = url;
    });
    day = day+1;
}
