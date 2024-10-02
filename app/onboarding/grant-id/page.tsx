import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

import VideoGif from "@/public/happy-cat-happy-happy-cat.gif";
import { CalendarCheck2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function OnboardingRouteTwo() {
    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>You are almost done!</CardTitle>
                    <CardDescription>We now need to connect your calendar to your account.</CardDescription>
                    <Image src={VideoGif} alt="almost fin"  className="w-full rounded-lg"/>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full">
                        <Link href="/api/auth">
                            <CalendarCheck2 className="size-4 mr-2"/>
                            Connect Calendar to your Account
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}