import React, { useState } from "react";

const Signup = () => {

  const [name, setName] = useState({
    car:"",
    bike:""
  })

  const {car, bike} = name;
  
  const  display = car => event =>{
    setName({...name, car: event.target.value+[car]})
  }

  const  displaybike = bike => event =>{
    setName({[bike]: event.target.value})
  }

  
  return(
    <div>
      <p>{car + bike}</p>
      <input  type="text" onChange={display("hello")}></input>
      <input  type="text" onChange={displaybike}></input>

    </div>
  )

};

export default Signup;
