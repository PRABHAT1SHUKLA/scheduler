import { authOptions, getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
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
    const accessToken = token?.accessToken

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
