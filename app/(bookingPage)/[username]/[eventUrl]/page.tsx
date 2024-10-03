import { Calendar } from "@/app/components/bookingForm/calendar";
import { RenderCalendar } from "@/app/components/bookingForm/RenderCalendar";
import prisma from "@/app/lib/db";
import { Card, CardContent } from "@/components/ui/card";
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
}: {
    params: {username: string; eventUrl: string};
}){
    const data = await getData(params.eventUrl, params.username); 
    return (
        <div className="min-h-screen w-screen flex items-center justify-center p-4">
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
                                    23. Sept 2024
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

                <RenderCalendar
                    daysofWeek={[
                        { day: "Monday", isActive: true },
                        { day: "Tuesday", isActive: true },
                        { day: "Wednesday", isActive: true },
                        { day: "Thursday", isActive: true },
                        { day: "Friday", isActive: true },
                        { day: "Saturday", isActive: true },
                        { day: "Sunday", isActive: true },
                    ]}
                />
                </CardContent>
            </Card>
        </div>
    )
}