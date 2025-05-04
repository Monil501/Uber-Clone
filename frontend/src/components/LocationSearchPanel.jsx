import React from 'react'

const LocationSearchPanel = (props) => {

  //sample array
  const locations = [
    "501,navkar,appt,ghanjkhana,opp bhanuras kendra,Valsad",
    "502,navkar,appt,ghanjkhana,opp bhanuras kendra,Valsad",
    "503,navkar,appt,ghanjkhana,opp bhanuras kendra,Valsad",
    "504,navkar,appt,ghanjkhana,opp bhanuras kendra,Valsad"
  ]
  return (
    <div>
      {/* this is just a sample data*/}
      {
        locations.map(function(elem){
          return <div onClick={()=>{
            props.setVehiclePanel(true)
            props.setPanelOpen(false)
          }} key={elem} className='flex gap-4 border-2 p-3 border-white active:border-black rounded-xl my-2 items-center justify-start'>
          <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
          <h4 className='font-medium'>{elem}</h4>
        </div>
        })
      }
      
      
    </div>
  )
}

export default LocationSearchPanel
