import { createClient } from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export default async function DesignersPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    return (
        <div>
            <div className="flex flex-col gap-2 items-start">
                <h2 className="font-bold text-2xl mb-4">Your user details</h2>
                <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
            </div>
            <h1>Designers</h1>
            <p>This is the designers page.</p>
        </div>
    );
}