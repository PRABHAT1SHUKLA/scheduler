import { useForm } from "react-hook-form"

const days =[
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday" 
]

interface availabilityProps{
    
  Slots : []

}


const availabiltyForm: React.FC<availabilityProps>= ({ Slots }) =>{

  const {register} = useForm()
 
   
  return( )



}