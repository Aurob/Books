var month = 1
function left(){
    if(month<1) month = 12;
    var day = parseInt(document.getElementById('day').innerHTML);
    if(day <10){
        day = "0"+day;
    }
    if(month <10){
        month = "0"+day;
    }
    var url = 'https://api.nasa.gov/planetary/earth/imagery/?lon=100.75&lat=1.5&date=2017-'+month+'-'+day+'&cloud_score=True&api_key=VJA4indt7zBEIj6P4wLp0UngsMQmhzqvDtMnh6f9'
    
    document.getElementById('info').innerHTML= '2017-'+month+'-'+day;
    fetch(url)
            .then(function(response) {
            return response.json();
        }).then(function(myJson) {
        url = JSON.stringify(myJson.url).replace('"','').replace('"','');
        console.log(url);
        document.getElementById('img').src = url;
    });
    if(day <1){
        day = 30;
	    month--;
    }
    document.getElementById('day').innerHTML = day--;
    
}
function right(){
    var day = parseInt(document.getElementById('day').innerHTML);
    if(day <10){
        day = "0"+day;
    }
    var url = 'https://api.nasa.gov/planetary/earth/imagery/?lon=100.75&lat=1.5&date=2017-01-'+day+'&cloud_score=True&api_key=VJA4indt7zBEIj6P4wLp0UngsMQmhzqvDtMnh6f9'
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
    if(day >29){
        day = 29;
    }
    document.getElementById('day').innerHTML = day+1;
    
}
