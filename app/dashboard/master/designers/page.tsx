import { createClient } from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import DesignerTable from './DesignerTable';

export default async function DesignersPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }


    // let { data: designers, error } = await supabase
    //     .from('designers')
    //     .select('*')
    //
    // if (error) {
    //     console.error("Error fetching designers:", error);
    //     return <p>Error loading designers.</p>; // Handle the error gracefully
    // }

    return (
        <div>
            designers page
            {/*<DesignerTable designers={designers} />*/}
        </div>
    );
}