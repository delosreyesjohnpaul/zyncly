import { redirect } from "next/navigation";
import { requireUser } from "../lib/hooks";

export default async function DashboardPage() {
    const session = await requireUser();
    return (
        <div>
            <h1>Hello from  the dashboard</h1>
        </div>
    )
}