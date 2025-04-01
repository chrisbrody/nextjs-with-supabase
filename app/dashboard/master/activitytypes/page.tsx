import { createClient } from '@/utils/supabase/server';
import { ActivityTypes } from '../../types/activitytypes';
import ActivityTypesTable from './ActivityTypeTable';

export default async function ActivityTypesPage() {
    const supabase = await createClient();

    let { data: activityTypes, error } = await supabase
        .from('activity_types')
        .select('*');

    if (error) {
        console.error("Error fetching activity types:", error);
        return <p>Error loading activity types.</p>;
    }

    const typedActivityTypes: ActivityTypes[] = activityTypes as ActivityTypes[];
    return (
        <div>
            <h1>Activity Types</h1>
            <ActivityTypesTable activityTypes={typedActivityTypes} />
        </div>
    );
}