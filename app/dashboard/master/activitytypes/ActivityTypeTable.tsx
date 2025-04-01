import React from 'react';
import { ActivityTypes } from '../../types/activitytypes';

interface ActivityTypesTableProps {
    activityTypes: ActivityTypes[];
}

const ActivityTypesTable: React.FC<ActivityTypesTableProps> = ({ activityTypes }) => { // Rename the component
    if (!activityTypes || activityTypes.length === 0) {
        return <p className="text-gray-600">No activity types found.</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Short Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Billable
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Color
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {activityTypes.map((activityType) => ( // Map over activityTypes
                    <tr key={activityType.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activityType.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activityType.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activityType.short_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activityType.billable ? 'Yes' : 'No'}</td> {/* Format boolean */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activityType.color}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ActivityTypesTable;