"use client";

import { Switch } from "@/components/ui/switch";
import { useFormState } from "react-dom";
import { updateEventTypeStatusAction } from "../actions";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";

export function MenuActiveSwitcher({
    initialChecked,
    eventTypeId,
  }: {
    eventTypeId: string;
    initialChecked: boolean;
  }) {

    const [isPending, startTransition] = useTransition();
    const [state, action] = useFormState(updateEventTypeStatusAction, undefined);

    useEffect(() => {
        if (state?.status === "success") {
          toast.success(state.message);
        } else if (state?.status === "error") {
          toast.error(state.message);
        }
      }, [state]);

    return (
        <Switch 
            disabled={isPending} 
            defaultChecked={initialChecked} 
            onCheckedChange={(isChecked) => {
                startTransition(() =>{
                    action({
                        eventTypeId: eventTypeId,
                        isChecked: isChecked,
                    })
                })
            }}
        />
    )
}