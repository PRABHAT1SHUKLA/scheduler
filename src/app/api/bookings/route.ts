import { authOptions, getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextApiRequest } from "next";
import {google} from "googleapis"
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET
export async function POST(req: NextApiRequest) {
  try {


    const bookingData= await req.body
    
    const event = await db.event.findUnique({
      where:{
        id: bookingData.eventId
      },
      include:{
        user:true,
      }
    })




  

    const token = await getToken({req,secret})
  




     
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({access_token:token});


    const calendar= google.calendar({
      version: 'v3',
      auth:oauth2Client
    });

    const meetResponse = await calendar.events.insert({
      calendarId: "primary",
      conferenceDataVersion:1,
      requestBody:{
        summary:`${bookingData.name} - ${event?.title}`,
        description: bookingData.additionalInfo,
        start:{dateTime: bookingData.startTime},
        end:{dateTime: bookingData.endTime},
        attendees:[{ email:bookingData.email} , {
          email: event?.user.email 
        }],
        conferenceData:{
          createRequest:{
            requestId:`${event?.id}-${Date.now()}`
          },
        },
      },
    }),
    
    const meetLink = meetResponse.data.hangoutLink;
    const googleEventId = meetResponse.data.id;
    
    if(!meetLink || !googleEventId){
      return new Response("unable to create meetlink")
    }

    const booking= await db.booking.create({
      data:{
        eventId: event?.id,
        userId: event?.userId,
        name:bookingData.name,
        email:bookingData.email,
        startTime:bookingData.startTime,
        endTime:bookingData.endTime,
        additionalInfo:bookingData.additionalInfo,
        meetLink,
        googleEventId,
      },
    });

    return {success: true ,booking, meetLink}


    // Check if the user is authenticated
  

    // Find admin by email
    // const admin = await db.user.findUnique({
    //   where: {
    //     username: params.username
    //   },
    // });

    // if (!admin) {
    //   return new Response("Admin not found", { status: 404 });
    // }

    // // Create a new booking record
    // await db.bookings.create({
    //   data: {
    //     userId: admin.id, // Use admin.id directly
    //     clientName: name,
    //     clientEmail: email,
    //     note: note,
    //     status: status,
    //     date: new Date(date), // Ensure the date is in the correct format
    //     start: start,
    //     end: end,
    //   },
    // });

    // return new Response("Booking created successfully", { status: 200 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return new Response("Failed to create booking", { status: 500 });
  }
}
