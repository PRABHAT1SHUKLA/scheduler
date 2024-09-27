import AvailabilityForm from "@/components/AvailabilityForm";
import { defaultAvailability } from "@/lib/data";

export default function availability(){
  return (
    <div>
      return <AvailabilityForm initialData = {defaultAvailability}/>
    </div>  
  )
}