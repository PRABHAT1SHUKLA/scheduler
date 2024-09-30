import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import {
    startOfDay,
    addDays,
    format,
    parseISO,
    isBefore,
    addMinutes,
  } from "date-fns";
import { NextApiRequest } from "next";
import { NextApiResponse } from "next";

interface Bookings{
    startTime: Date,
    endTime: Date,
}

interface GenerateAvailableTimeSlotsParams{
    startTime: Date,
    endTime:Date,
    bookings: Bookings[],
    duration:number,
    dateStr: string,
    timeGap?: number
}

export async function POST(req: NextApiRequest, res:NextApiResponse){
    try{
        const {eventId} = req.body

        if(!eventId){
            return res.status(400).json({
                message:"Missing eventId"
            })
        }


        const event = await db.event.findUnique({
            where:{id:eventId},
            include:{
                user:{
                    include:{
                        availability:{
                            select:{
                                days:true,
                                timeGap: true,
                            },
                        },
                        bookings:{
                            select:{
                                startTime:true,
                                endTime:true,
                            }
                        }
                        
                    }
                }
            }
        });

        

        if(!event || !event.user.availability){
            return res.status(404).json({
                msg:" event or avoilability not found"
            })
        }

        const {availability, bookings}= event.user

        const startDate= startOfDay(new Date())

        const endDate = addDays(startDate, 30)

        const availableDates =[];


        let date=startDate

        for(date ; date<=endDate; date=addDays(date,1)){
            const dayOfWeek= format(date,"EEEE").toUpperCase();

            const dayAvailability = availability?.days?.find(
                (d)=>d.day === dayOfWeek
            )

            if(dayAvailability){
                const dateStr = format(date,"yyyy-MM-dd");

                const slots= generateAvailableTimeSlots({

                    startTime: dayAvailability.startTime,
                    endTime: dayAvailability.endTime,
                    duration: event.duration,
                    bookings: bookings,
                    dateStr: dateStr,
                    timeGap: availability.timeGap,

            });
                availableDates.push({
                    date:dateStr,
                    slots
                });
            }
        }

     return res.status(200).json({availableDates})




  

    

    }
    catch(error){
        return res.status(500).json({
            msg:"error fetching event availability"
        });
    }
    


}

function generateAvailableTimeSlots(
    {startTime,
    endTime,
    duration,
    bookings,
    dateStr,
    timeGap = 0}:GenerateAvailableTimeSlotsParams
  ) : string[]{
    const slots:string[] = [];
    let currentTime = parseISO(
      `${dateStr}T${startTime.toISOString().slice(11, 16)}`
    );
    const slotEndTime = parseISO(
      `${dateStr}T${endTime.toISOString().slice(11, 16)}`
    );
  
    // If the date is today, start from the next available slot after the current time
    const now = new Date();
    if (format(now, "yyyy-MM-dd") === dateStr) {
      currentTime = isBefore(currentTime, now)
        ? addMinutes(now, timeGap)
        : currentTime;
    }
  
    while (currentTime < slotEndTime) {
      const slotEnd = new Date(currentTime.getTime() + duration * 60000);
  
      const isSlotAvailable = !bookings.some((booking) => {
        const bookingStart = booking.startTime;
        const bookingEnd = booking.endTime;
        return (
          (currentTime >= bookingStart && currentTime < bookingEnd) ||
          (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
          (currentTime <= bookingStart && slotEnd >= bookingEnd)
        );
      });
  
      if (isSlotAvailable) {
        slots.push(format(currentTime, "HH:mm"));
      }
  
      currentTime = slotEnd;
    }
  
    return slots;
  }