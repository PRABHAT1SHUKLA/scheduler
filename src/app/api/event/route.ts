import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(req: Request){
    try{
        const body = await req.json()

    const { duration , eventType } = body

    const session = await getAuthSession()

    if(!session?.user){
        return new Response("User not Authorized", { status: 401 })
    }

    await db.event.create({
        data:{
            duration: duration,
            userId: session.user.id,
            eventType: eventType

        }
    })

    return new Response("OK")

    }
    catch(error){
        return new Response("Sorry")
    }
    


}

function generateAvailableTimeSlots(
    startTime,
    endTime,
    duration,
    bookings,
    dateStr,
    timeGap = 0
  ) {
    const slots = [];
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