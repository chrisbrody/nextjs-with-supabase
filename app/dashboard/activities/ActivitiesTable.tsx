'use client';

import React, { useState, useEffect } from 'react';
import { Activity } from '../types/activity';
import { createClient } from "@/utils/supabase/client";

interface ActivityTableProps {
    activities: Activity[];
}

interface ActivityType {
    id: string;
    name: string;
}

const ActivityTable: React.FC<ActivityTableProps> = ({ activities }) => {
    const [designerNames, setDesignerNames] = useState<{ [key: string]: string }>({});
    const [activityTypeNames, setActivityTypeNames] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchDesignerAndActivityTypeNames = async () => {
            const supabase = createClient();

            const designerIds = [...new Set(activities.map(activity => activity.designer_id))];
            const activityTypeIds = [...new Set(activities.map(activity => activity.activity_type))]; // Get unique activity type IDs

            // Convert Set to Array
            const designerIdsArray = Array.from(designerIds);
            const activityTypeIdsArray = Array.from(activityTypeIds);

            const { data: designers, error: designerError } = await supabase
                .from('designers')
                .select('id, name')
                .in('id', designerIdsArray);

            if (designerError) {
                console.error("Error fetching designers:", designerError);
                return;
            }

            const { data: activityTypes, error: activityTypeError } = await supabase
                .from('activity_types')
                .select('id, short_name')
                .in('id', activityTypeIdsArray); // Use the array

            console.log(activityTypes)

            if (activityTypeError) {
                console.error("Error fetching activity types:", activityTypeError);
                return;
            }

            const designerNamesMap: { [key: string]: string } = {};
            designers.forEach(designer => {
                designerNamesMap[designer.id] = designer.name;
            });
            setDesignerNames(designerNamesMap);

            const activityTypeNamesMap: { [key: string]: string } = {};
            activityTypes.forEach(activityType => {
                activityTypeNamesMap[activityType.id] = activityType.short_name;
            });
            setActivityTypeNames(activityTypeNamesMap);
        };

        if (activities && activities.length > 0) {
            fetchDesignerAndActivityTypeNames();
        }
    }, [activities]);

    if (!activities || activities.length === 0) {
        return <p className="text-gray-600">No activities found.</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Activity Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Designer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Billable
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Billable Rate
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Billable Status
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {activities.map((activity) => {
                    const designerName = designerNames[activity.designer_id] || "Loading...";
                    const activityTypeName = activityTypeNames[activity.activity_type] || "Loading..."; // Get activity type name
                    return (
                        <tr key={activity.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activityTypeName}</td> {/* Display activity type name */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{designerName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.duration} {activity.unit}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.billable ? 'Yes' : 'No'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.billable_rate}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.billable_status}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default ActivityTable;