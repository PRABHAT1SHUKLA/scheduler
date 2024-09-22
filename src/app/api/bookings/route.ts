import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request, {params}: { params: {username: string }}) {
  try {


    const body = await req.json();
    const { name, email, note, status, date, start, end } = body;

    const session = await getAuthSession();

    // Check if the user is authenticated
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Find admin by email
    const admin = await db.user.findUnique({
      where: {
        username: params.username
      },
    });

    if (!admin) {
      return new Response("Admin not found", { status: 404 });
    }

    // Create a new booking record
    await db.bookings.create({
      data: {
        userId: admin.id, // Use admin.id directly
        clientName: name,
        clientEmail: email,
        note: note,
        status: status,
        date: new Date(date), // Ensure the date is in the correct format
        start: start,
        end: end,
      },
    });

    return new Response("Booking created successfully", { status: 200 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return new Response("Failed to create booking", { status: 500 });
  }
}
