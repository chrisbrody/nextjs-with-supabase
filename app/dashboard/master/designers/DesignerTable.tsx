import React from 'react';

// Define the type for a single designer object
interface Designer {
    id: string;
    name: string;
    email: string;
    rate: number;
    // Add other properties as needed (e.g., created_at)
    created_at?: string; // Optional property
}

// Define the type for the designers prop (an array of Designer objects)
interface DesignerTableProps {
    designers: Designer[];
}

const DesignerTable: React.FC<DesignerTableProps> = ({ designers }) => {  // Use React.FC and DesignerTableProps
    if (!designers || designers.length === 0) {
        return <p className="text-gray-600">No designers found.</p>;
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
                        Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rate
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {designers.map((designer) => (
                    <tr key={designer.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{designer.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{designer.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{designer.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{designer.rate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DesignerTable;