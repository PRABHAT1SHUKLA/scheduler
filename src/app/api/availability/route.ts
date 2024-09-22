import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

//route handles admin request for availability creation
export async function POST(req: Request) {
  try {
    console.log("hello");
    const body = await req.json();

    const { day, startTime, endTime } = body;

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorizeed", {
        status: 401,
      });
    }

    await db.weeklyavailability.create({
      data: {
        dayOfWeek: day,
        start: startTime,
        end: endTime,
        userId: session.user.id,
      },
    });
    return new Response("OK");
  } catch (error: any) {
    return new Response(error);
  }
}

export async function GET(req: Request) {
  try {
    const { dayOfWeek } = await req.json();
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const availabilities = await db.weeklyavailability.findMany({
      where: {
        userId: session.user.id,
        dayOfWeek: dayOfWeek,
      },
      select: {
        start: true,
        end: true,
      },
    });

    const fusk = JSON.stringify(availabilities);
    console.log(dayOfWeek);

    return new Response(`${dayOfWeek}: ${fusk}`);
  } catch (error: any) {
    return new Response(error);
  }
}
