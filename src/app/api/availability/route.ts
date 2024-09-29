import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { availabilitySchema } from "@/lib/validators/availability"
import { NextApiRequest, NextApiResponse } from "next"
import z from "zod"

//route handles admin request for availability creation
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorizeed", {
        status: 401
      })
    }

    const parsedData = availabilitySchema.parse(req.body);

    const user = await db.user.findUnique({
      where: {
        id: session.user.id
      },
      include: {
        availability: true
      }
    })


    if (!user) {
      return res.status(404).json({
        error: "User not found"
      })
    }

    const availabilityData  = Object.entries(parsedData).flatMap(
      ([day, { isAvailable, startTime, endTime }]) => {
        if (isAvailable) {
          const baseDate = new Date().toISOString().split('T')[0];

          return [
            {
              day: day.toUpperCase(),
              startTime: new Date(`${baseDate}T${startTime}:00Z`),
              endTime: new Date(`${baseDate}T${endTime}:00Z`),
            },
          ];
        }
        return [];
      }
    );

    //To update availability data by doing a db call  here

    if (user.availability) {

      await db.weeklyavailability.update({
        where: { id: user.availability.id },
        data: {
          timeGap: parsedData.timeGap,
          days: {
            deleteMany: {},//deletes all existing data
            create: availabilityData,
          }
        }
      })
    } else {
      await db.weeklyavailability.create({
        data: {
          userId: user.id,
          timeGap: parsedData.timeGap,
          days: {
            create: availabilityData,
          }

        }
      })
    }


  return res.status(200).json({success:true});


  }
  catch (error) {
    console.error('Error updating availability:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid request data', details: error.errors });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}



export async function GET(req: Request) {
  try {

    const session = await getAuthSession()



    if (!session?.user) {
      return new Response("Unauthorized", {
        status: 401
      })
    }

    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        availability: {
          include: { days: true }
        }
      },
    })

    if (!user || !user?.availability) {
      return null
    }

    const data = {
      timeGap: user.availability.timeGap
    };

    [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ].forEach((day) => {
      const dayAvailability = user.availability?.days.find((d) => d.day === day.toUpperCase());

      data[day] = {
        isAvailable: !!dayAvailability,
        startTime: dayAvailability ? dayAvailability.startTime.toISOString().slice(11, 16)
          : "09:00",
        endTime: dayAvailability ? dayAvailability.endTime.toISOString().slice(11, 16) : "17.00"
      }



    })

    return data;


  }



  catch (error: any) {
    return new Response(error)

  }
}