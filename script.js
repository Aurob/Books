function left(day){
    const userAction = async () => {
      const response = await fetch('https://api.nasa.gov/planetary/earth/imagery/?lon=100.75&lat=1.5&date=2017-'+day+'-01&cloud_score=True&api_key=DEMO_KEY');
      const myJson = await response.json(); //extract JSON from the http response
      console.log(myJson);
      // do something with myJson
    }
  document.getElementById('info').innerHTML= new Date();
}
function right(day){
  const userAction = async () => {
    const response = await fetch('https://api.nasa.gov/planetary/earth/imagery/?lon=100.75&lat=1.5&date=2017-'+day+'-01&cloud_score=True&api_key=DEMO_KEY');
    const myJson = await response.json(); //extract JSON from the http response
    console.log(myJson);
    // do something with myJson
  }
  document.getElementById('info').innerHTML= new Date();
}
