function left(){
    var day = parseInt(document.getElementById('day').innerHTML);
    if(day <10){
        day = "0"+day;
    }
    var url = 'https://api.nasa.gov/planetary/earth/imagery/?lon=100.75&lat=1.5&date=2017-'+day+'-01&cloud_score=True&api_key=DEMO_KEY'
    console.log("left\n"+day+"\n"+url);
    document.getElementById('info').innerHTML= new Date();
    fetch(url)
            .then(function(response) {
            return response.json();
        }).then(function(myJson) {
        url = JSON.stringify(myJson.url).replace('"','').replace('"','');
        console.log(url);
        document.getElementById('img').src = url;
    });
    if(day < 2){
        day = 2;
    }
    document.getElementById('day').innerHTML = day-1;
    
}
function right(){
    var day = parseInt(document.getElementById('day').innerHTML);
    if(day <10){
        day = "0"+day;
    }
    console.log('left '+day);
    document.getElementById('info').innerHTML= new Date();
    fetch('https://api.nasa.gov/planetary/earth/imagery/?lon=100.75&lat=1.5&date=2017-'+day+'-01&cloud_score=True&api_key=DEMO_KEY')
            .then(function(response) {
            return response.json();
        }).then(function(myJson) {
        url = JSON.stringify(myJson.url).replace('"','').replace('"','');
        document.getElementById('img').src = url;
    });
    if(day >29){
        day = 29;
    }
    document.getElementById('day').innerHTML = day+1;
    
}
