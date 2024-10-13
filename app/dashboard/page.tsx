import { notFound } from "next/navigation";
import prisma from "../lib/db";
import { requireUser } from "../lib/hooks";
import { EmptyState } from "../components/EmptyState";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, Link2, Pen, Settings, Trash, Users2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CopyLinkMenuItem } from "../components/CopyLinkMenu";

async function getData(id: string) {
    const data = await prisma.user.findUnique({
        where: {
            id: id,
          },
      
          select: {
            eventType: {
              select: {
                id: true,
                active: true,
                title: true,
                url: true,
                duration: true,
              },
              orderBy: {
                createdAt: "desc",
              },
            },
            userName: true,
          },
          
    });
    if (!data) {
        return notFound();
      }
    
      return data;
}

export default async function DashboardPage() {
    const session = await requireUser();
    const data = await getData(session.user?.id as string);
    return (
        <>
            {data.eventType.length === 0 ? (
                <EmptyState title="You have no Event Types right now" description="You can create your first event type by clicking the button bellow" buttonText="Add event type" href="/dashboard/new" />
            ): (
                <>
                  <div className="flex items-center justify-between px-2">
                    <div className="hidden sm:grid gap-y-1">
                      <h1 className="text-3xl md:text-4xl font-semibold">Event types</h1>
                      <p className="text-muted-foreground">Create and manage your event types right here</p>
                    </div>
                    <Button asChild>
                      <Link href="/dashboard/new">
                        Create new event
                      </Link>
                    </Button>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {data.eventType.map((item) => (
                      <div className="overflow-hidden shadow rounded-lg border relative" key={item.id}>

                        <div className="absolute top-2 right-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="icon">
                                <Settings className="size-4"/>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>
                                Event
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator/>
                              <DropdownMenuGroup>
                                <DropdownMenuItem asChild>
                                  <Link href={`/${data.userName}/${item.url}`}>
                                    <ExternalLink className="mr-2 size-4"/>
                                    Preview
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <CopyLinkMenuItem meetingUrl={`${process.env.NEXT_PUBLIC_URL}/${data.userName}/${item.url}`}/>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/dashboard/event/${item.id}`}>
                                    <Pen className="mr-2 size-4"/>
                                    Edit
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem>
                                  <Trash className="mr-2 size-4"/>
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <Link href="/" className="flex items-center p-5">
                           <div className="flex-shrink-0">
                              <Users2 className="size-6"/>
                           </div>

                           <div className="ml-5 w-0 flex-1">
                              <dl>
                                <dt className="text-sm font-medium text-muted-foreground">
                                  {item.duration} Minutes Meeting
                                </dt>
                                <dd className="text-lg font-medium">
                                    {item.title}
                                </dd>
                              </dl>

                           </div>
                        </Link>
                        <div className="bg-muted px-5 py-3 justify-between items-center flex">
                          <Switch/>
                          <Button>
                            Edit event
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
            )}
        </>
    )
}