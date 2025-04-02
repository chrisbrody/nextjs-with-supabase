'use client';

import { createClient } from "@/utils/supabase/client";
import DesignerTable from './DesignerTable';
import { Designer } from '../../types/designer';
import React, { useState, useEffect } from 'react';

export default function DesignersPage() {
    const [designers, setDesigners] = useState<Designer[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const supabase = await createClient();
            let { data: designersData, error } = await supabase
                .from('designers')
                .select('*');

            if (error) {
                console.error("Error fetching designers:", error);
                return;
            }
            setDesigners(designersData || []);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Designers</h1>
            <DesignerTable designers={designers} setDesigners={setDesigners} />
        </div>
    );
}