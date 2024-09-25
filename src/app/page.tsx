import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getAuthSession } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { Calendar, Clock, Users, Zap, Check } from "lucide-react"
import Link from "next/link"

export default async function  LandingPage() {

  const session = await getAuthSession()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link className="flex items-center justify-center" href="#">
          <Clock className="h-6 w-6 mr-2" />
          <span className="font-bold text-xl">TameTime</span>
        </Link>
        <nav className="m-auto flex gap-4 sm:gap-6  ">
          <Link className="text-base font-bold hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-base font-bold hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-base font-bold hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-base font-bold hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
        {session ? <Link href="/sign-in" 
        className={cn(buttonVariants({variant: "outline"} ))}>Login</Link> :    <Link href="/sign-in" 
        className={cn(buttonVariants({variant: "default"} ))}>Login</Link> }
   
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Tame Your Time, Boost Your Productivity
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  TameTime is the all-in-one scheduling platform that helps you regain control of your calendar and make every minute count.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Features That Set Us Apart
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <Calendar className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-lg font-bold">Smart Scheduling</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  AI-powered scheduling that learns your preferences and optimizes your time.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Users className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-lg font-bold">Team Coordination</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Effortlessly manage team availability and group scheduling.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Zap className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-lg font-bold">Instant Booking</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Allow clients to book appointments with you in seconds.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Seamless Integrations
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              {["Google Calendar", "Outlook", "Zoom", "Microsoft Teams", "Slack"].map((integration) => (
                <div key={integration} className="flex items-center justify-center w-40 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <span className="font-semibold">{integration}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Pricing Plans
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Basic", price: "$10", features: ["Smart Scheduling", "5 Calendar Connections", "Email Support"] },
                { name: "Pro", price: "$25", features: ["Everything in Basic", "Unlimited Calendar Connections", "Team Scheduling", "Priority Support"] },
                { name: "Enterprise", price: "Custom", features: ["Everything in Pro", "Custom Integrations", "Dedicated Account Manager", "SLA"] },
              ].map((plan) => (
                <div key={plan.name} className="flex flex-col p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="mt-4 text-4xl font-bold">{plan.price}</div>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">per month</p>
                  <ul className="mt-4 space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-5 w-5 mr-2 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-6">Choose Plan</Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Tame Your Time?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join thousands of professionals who have revolutionized their scheduling with TameTime.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit">Get Started</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Start your 14-day free trial. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 TameTime. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}