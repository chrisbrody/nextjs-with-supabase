import { createClient } from "@/utils/supabase/server";
import { Activity } from '../types/activity';
import ActivityTable from './ActivitiesTable';

export default async function ActivitiesPage() {
    const supabase = await createClient();

    let { data: activities, error } = await supabase
        .from('activities') // Assuming your table is named 'activities'
        .select('*');

    if (error) {
        console.error("Error fetching activities:", error);
        return <p>Error loading activities.</p>;
    }

    const typedActivities: Activity[] = activities as Activity[];

    return (
        <div>
            <h1>Activities</h1>
            <ActivityTable activities={typedActivities} />
        </div>
    );
}