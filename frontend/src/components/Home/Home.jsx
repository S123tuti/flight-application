import React, {useState} from 'react';
import "./style.css";
import axios from "axios";

const Home = () => {
    let [source, setSource] = useState("")
    let [destination , setDestination ] = useState("")
    let [date, setDate] = useState("")
    let [table, setTable] = useState([])
    let [condition , setCondition] = useState(false)
    let [loding , setLoding] = useState(false)

    console.log(table)

    const handdleClick = async (e) =>{
      e.preventDefault()
       setLoding(true)
        let res =   await axios.post("http://localhost:3500/flights",{
            source : source,
            destination: destination,
            date : date
        })
         setTable(res.data.data)
         setSource("")
         setDestination("")
         setDate("")
         setCondition(true)
         setLoding(false)
    }
  return (
    
    <div  className='body' >
        <h1>Search Flights</h1>
     <form className='form'>
        <div className='int'>
            <label htmlFor="source">Source: </label>
            <input type="text" id='source' placeholder='Enter City Code' value={source} onChange={(e)=> setSource(e.target.value)} />
        </div>
        <div className='int'>
            <label htmlFor="destination">Destination: </label>
            <input type="text" id='destination' placeholder='Enter City Code' value={destination} onChange={(e)=> setDestination(e.target.value)} />
        </div>
        <div className='int'>
            <label htmlFor="date">Date: </label>
            <input type="date" id='date' value={date} onChange={(e)=> setDate(e.target.value)} />
        </div>
        
        <button className='int' onClick={handdleClick}>Submit</button>
        </form> 
        {
         loding && <h4>Please wait data is loding ...</h4>
        }
        {condition &&
        <div className='flightData'>
            <table border="1">
             <thead>
            
                   <th>S.No</th> 
                   <th>Flight</th> 
                   <th>price</th> 
            
             </thead>
          <tbody>
         {
            table.map((x,id) =>
                 <tr key={id}>
                    <td>{id+1}</td>
                    <td>{x[0]}</td>
                    <td>{x[1]}</td>
                 </tr>
            )
         }
         </tbody>
           </table>
        </div>
}
    </div>
  )
}

export default Home