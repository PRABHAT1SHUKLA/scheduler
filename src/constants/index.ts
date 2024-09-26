import { Clock, User, Calendar, Settings  } from 'lucide-react'
export const sidebarLinks = [

  {
    icon: User,
    route: "/Tametime/availability",
    label: "admin availability",
  },
  {
    icon: Clock,
    route: "/Tametime/event-type",
    label: "event type",
  },
  {
    icon: Calendar,
    route: "/Tametime/bookings",
    label: "admin bookings",
  },
  {
    icon: Settings,
    route: "/Tametime/settings",
    label: "settings",
  },
];