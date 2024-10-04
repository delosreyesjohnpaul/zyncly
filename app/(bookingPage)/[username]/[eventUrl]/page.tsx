import { CreateMeetingAction } from "@/app/actions";
import { Calendar } from "@/app/components/bookingForm/calendar";
import { RenderCalendar } from "@/app/components/bookingForm/RenderCalendar";
import { TimeTable } from "@/app/components/bookingForm/TimeTable";
import { SubmitButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { BookMarked, CalendarX2, Clock, VideoIcon } from "lucide-react";
import { notFound } from "next/navigation";
async function getData(eventUrl: string, userName: string) {
    const data = await prisma.eventType.findFirst({
        where: {
            url: eventUrl,
            User: {
                userName: userName,
            },
            active: true,
        },
        select: {
            id: true,
            description: true,
            title: true,
            duration: true,
            videoCallSoftware: true,
            createdAt: true,
            User: {
                select: {
                    image: true,
                    name: true,
                    availability:{
                        select: {
                            day: true,
                            isActive: true,
                        }
                    }
                }
            }
        },
    });

    if (!data) {
        return notFound();
    }
    
    return data;
}

export default async function BookingFormRoute({
    params,
    searchParams,
}: {
    params: {username: string; eventUrl: string};
    searchParams: {date?: string, time?: string}
}){
    const data = await getData(params.eventUrl, params.username); 
    const selectedDate = searchParams.date 
        ? new Date(searchParams.date) 
        : new Date();
    const formattedDate = new Intl.DateTimeFormat("en-Us", {
        weekday: "long",
        day: "numeric",
        month: "long",
        timeZone: "Asia/Manila"
    }).format(selectedDate);

    const showForm = !!searchParams.date && !!searchParams.time;

    return (
        <div className="min-h-screen w-screen flex items-center justify-center p-4">
            {showForm ? (
            <Card className="max-w-[600px] w-full">
                 <CardContent className="p-5 grid md:grid-cols-[1fr,auto,1fr] gap-4">
                     <div>
                         <img src={data.User?.image as string} alt="userprofile" className="size-10 rounded-full" />
                         <p className="text-sm font-medium text-[#6B7280] mt-1">{data.User?.name}</p>
                         <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
                         <p className="text-sm font-medium text-[#374151]">{data.description}</p>
                         <div className="mt-5 flex flex-col gap-y-3">
                             <p className="flex items-center">
                                 <CalendarX2 className="size-4 mr-2 text-primary"/>
                                 <span className="text-sm font-medium text-muted-foreground">
                                     {formattedDate}
                                 </span>
                             </p>
                             <p className="flex items-center">
                                 <Clock className="size-4 mr-2 text-primary" />
                                 <span className="text-sm font-medium text-[#374151]">
                                     {data.duration} Minutes
                                 </span>
                             </p>

                             <p className="flex items-center">
                                 <VideoIcon className="size-4 mr-2 text-primary" />
                                 <span className="text-sm font-medium text-[#374151]">
                                     {data.videoCallSoftware}
                                 </span>
                             </p>
                         </div>
                     </div>

                     <Separator orientation="vertical" className="hidden md:block h-full w-[1px]"/>

                     <form className="flex flex-col gap-y-4" action={CreateMeetingAction}>
                        <input type="hidden" name="fromTime" value={searchParams.time} />
                        <input type="hidden" name="eventDate" value={searchParams.date} />
                        <input type="hidden" name="meetingLength" value={data.duration} />
                        <input type="hidden" name="provider" value={data.videoCallSoftware} />
                        <input type="hidden" name="username" value={params.username} />
                        <input type="hidden" name="eventTypeId" value={data.id} />

                        <div className="flex flex-col gap-y-2">
                            <Label>Your Name</Label>
                            <Input 
                                name="name"
                                placeholder="Enter your name"
                            />

                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>Your email</Label>
                            <Input 
                                name="email"
                                placeholder="zyncly@gmail.com"
                            />
                        </div>

                        <SubmitButton className="w-full mt-6" text="Book Meeting"/>
                     </form>
                 </CardContent>
             </Card>
            ): (
                <Card className="max-w-[1000px] w-full mx-auto">
                    <CardContent className="p-5 grid md:grid-cols-[1fr,auto,1fr,auto,1fr] gap-4">
                        <div>
                            <img src={data.User?.image as string} alt="userprofile" className="size-10 rounded-full" />
                            <p className="text-sm font-medium text-[#6B7280] mt-1">{data.User?.name}</p>
                            <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
                            <p className="text-sm font-medium text-[#374151]">{data.description}</p>
                            <div className="mt-5 flex flex-col gap-y-3">
                                <p className="flex items-center">
                                    <CalendarX2 className="size-4 mr-2 text-primary"/>
                                    <span className="text-sm font-medium text-muted-foreground">
                                        {formattedDate}
                                    </span>
                                </p>
                                <p className="flex items-center">
                                    <Clock className="size-4 mr-2 text-primary" />
                                    <span className="text-sm font-medium text-[#374151]">
                                        {data.duration} Minutes
                                    </span>
                                </p>

                                <p className="flex items-center">
                                    <VideoIcon className="size-4 mr-2 text-primary" />
                                    <span className="text-sm font-medium text-[#374151]">
                                        {data.videoCallSoftware}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <Separator orientation="vertical" className="hidden md:block h-full w-[1px]"/>

                    <RenderCalendar availability={data.User?.availability as any}/>
                    <Separator orientation="vertical" className="h-full w-[1px]"/>

                    <TimeTable selectedDate={selectedDate} userName={params.username} duration={data.duration}/>
                    </CardContent>
                </Card>
            )}

        </div>
    )
}