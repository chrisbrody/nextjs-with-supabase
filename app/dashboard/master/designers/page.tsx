import { createClient } from "@/utils/supabase/server";
import DesignerTable from './DesignerTable';
import { Designer } from '../../types/designer';

export default async function DesignersPage() {
    const supabase = await createClient();

    let { data: designers, error } = await supabase
        .from('designers')
        .select('*');

    if (error) {
        console.error("Error fetching designers:", error);
        return <p>Error loading designers.</p>;
    }
    const typedDesigners: Designer[] = designers as Designer[];

    return (
        <div>
            designers page
            <DesignerTable designers={typedDesigners} />
        </div>
    );
}