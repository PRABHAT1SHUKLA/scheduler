import AvailabilityForm from "@/components/AvailabilityForm";
import { defaultAvailability } from "@/lib/data";

export default function availability(){
  return (
    <div>
       <AvailabilityForm initialData = {defaultAvailability}/>
    </div>  
  )
}