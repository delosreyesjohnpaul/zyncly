"use client"

import { useForm } from "@conform-to/react";
import { useState } from "react";
import { useFormState } from "react-dom";
import { CreateEventTypeAction } from "../actions";
import { parseWithZod } from "@conform-to/zod";
import { eventTypeSchema } from "../lib/zodSchema";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SubmitButton } from "./SubmitButtons";


type MeetingCallProvider = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

interface iAppProps {
    id: string;
    title: string;
    url: string;
    description: string;
    duration: number;
    callProvider: string;
}

export function EditEventForm({
    description,
    duration,
    title,
    url,
    callProvider,
    id,
} : iAppProps) {

    const [activePlatform, setActivePlatform] = useState<MeetingCallProvider>(callProvider as MeetingCallProvider);

    const [lastResult, action] = useFormState(CreateEventTypeAction, undefined);
    const [form, fields] = useForm({
        lastResult,

        onValidate({formData}) {
            return parseWithZod(formData, {
                schema: eventTypeSchema,
            });
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });
    return(
        <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Edit appointment type</CardTitle>
                    <CardDescription>
                        Edit your appointment type that allows people to book times.
                    </CardDescription>    
                </CardHeader>
                <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
                    <CardContent  className="grid gap-y-5">
                        <div className="flex flex-col gap-y-2">
                            <Label>Title</Label>
                            <Input
                                name={fields.title.name}
                                key={fields.title.key}
                                defaultValue={title}
                                placeholder="Title of your meeting"
                            />
                            <p className="text-red-500 text-sm">{fields.title.errors}</p>
                        </div>

                        <div className="grid gap-y-2 ">
                            <Label>URL Slug</Label>
                            <div className="flex rounded-md">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-muted-foreground text-sm">
                                    zyncly.com/
                                </span>
                                <Input 
                                    type="text"
                                    key={fields.url.key}
                                    defaultValue={url}
                                    name={fields.url.name}
                                    placeholder="Example-url-1"
                                    className="rounded-l-none"
                                />
                            </div>
                            <p className="text-red-500 text-sm">{fields.url.errors}</p>
                        </div>

                        <div className="grid gap-y-2">
                            <Label>Description</Label>
                            <Textarea 
                                name={fields.description.name}
                                key={fields.description.key}
                                defaultValue={description}
                                placeholder="Join me in this meeting."
                            />
                            <p className="text-red-500 text-sm">{fields.description.errors}</p>
                        </div>

                        <div className="grid gap-y-2">
                            <Label>Duration</Label>
                            <Select 
                                name={fields.duration.name}
                                key={fields.duration.key}
                                defaultValue={String(duration)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select duration">
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>
                                            Duration
                                        </SelectLabel>
                                        <SelectItem value="15">15 minutes</SelectItem>
                                        <SelectItem value="30">30 minutes</SelectItem>
                                        <SelectItem value="45">45 minutes</SelectItem>
                                        <SelectItem value="60">1 hour</SelectItem>
                                        <SelectItem value="75">1 hour & 15 minutes</SelectItem>
                                        <SelectItem value="90">1 hour & 30 minutes</SelectItem>
                                        <SelectItem value="105">1 hour & 45 minutes</SelectItem>
                                        <SelectItem value="120">2 hours</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <p className="text-red-500 text-sm">{fields.duration.errors}</p>
                        </div>

                        <div className="grid gap-y-2">
                            <Label>Meeting Call Provider</Label>
                            <input type="hidden" name={fields.videoCallSoftware.name} value={activePlatform}/>
                            <ButtonGroup className="w-full">
                                <Button
                                    type="button"
                                    className="w-full"
                                    onClick={() => setActivePlatform("Zoom Meeting")}
                                    variant={
                                        activePlatform === "Zoom Meeting" ? "secondary" : "outline"
                                    }
                                >Zoom</Button>

                                <Button
                                    type="button"
                                    className="w-full"
                                    onClick={() => setActivePlatform("Google Meet")}
                                    variant={
                                        activePlatform === "Google Meet" ? "secondary" : "outline"
                                    }
                                >Google Meet</Button>

                                <Button 
                                    type="button"
                                    className="w-full"
                                    onClick={() => setActivePlatform("Microsoft Teams")}
                                    variant={
                                        activePlatform === "Microsoft Teams" ? "secondary" : "outline"
                                    }
                                >Microsoft Teams</Button>
                            </ButtonGroup>
                            <p className="text-red-500 text-sm">{fields.videoCallSoftware.errors}</p>
                        </div>
                    </CardContent>
                    <CardFooter className="w-full flex justify-between">
                        <Button variant="secondary" asChild>
                            <Link href="/dashboard">Cancel</Link>
                        </Button>
                        <SubmitButton text="Edit event type"/>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}