import React from 'react';
import { Activity } from '../types/activity';

interface ActivityTableProps {
    activities: Activity[];
}

const ActivityTable: React.FC<ActivityTableProps> = ({ activities }) => {
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
                        Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Designer ID
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
                {activities.map((activity) => (
                    <tr key={activity.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.designer_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.duration} {activity.unit}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.billable ? 'Yes' : 'No'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.billable_rate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.billable_status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ActivityTable;