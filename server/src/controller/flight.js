
const axios = require("axios")

  const flightData =async(  req,res)=>{
    try{
      
      let {source, destination, date} = req.body;


      if(!source, !destination , !date)
      return res.
      status(400)
      .send({status:false, message:"please enter required fields it mendate to endter "})
    
      source = source.toUpperCase();
      destination = destination.toUpperCase();


        let flights = await getFlights(source, destination, date)
    
  
        return res.status(200).send({status:true, data:flights})
    }catch(e){
         res.status(500).send({status:false, message:e.message})
    }
  };


  const  getFlights =  async(originCity, destinationCity, date) => {
    const options = {
      method: 'GET',
      url: 'https://priceline-com-provider.p.rapidapi.com/v2/flight/departures',
      params: {
        adults: '1',
        sid: 'iSiX639',
        departure_date: date,
        origin_airport_code: originCity,
        destination_airport_code: destinationCity,
  
      },
      headers: {
        'X-RapidAPI-Key': "d52ec63e60msh77648a2ec5f0af5p18fa0bjsn0b3936d383e6",
        'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
      }
    };
    try {
      const response = await axios.request(options);
      const flights = response.data.getAirFlightDepartures.results.result;
 
      let itinerary = flights.itinerary_data;
      
      let data = Object.values(itinerary);
  
   
      let prices = [];
      data.forEach( e=>{
       prices.push( [[e.slice_data.slice_0.airline.name] ,[`₹${e.price_details.display_total_fare * 81.81}`.slice(0,9)]])
      })
      return prices;
    } catch (error) {
    console.log(error)
  }};


  module.exports ={ flightData}