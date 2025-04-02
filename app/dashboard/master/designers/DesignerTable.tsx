import React from 'react';
import { Designer } from '../../types/designer';
import EditableField from '../../../../components/editable-field'; // Import the EditableField component

interface DesignerTableProps {
    designers: Designer[];
    setDesigners: React.Dispatch<React.SetStateAction<Designer[]>>; // Add a setter function
}

const DesignerTable: React.FC<DesignerTableProps> = ({ designers, setDesigners }) => {
    if (!designers || designers.length === 0) {
        return <p className="text-gray-600">No designers found.</p>;
    }

    const handleDesignerChange = (id: string, columnName: string, newValue: string | number) => {
        setDesigners(designers.map(designer => {
            if (designer.id === id) {
                return { ...designer, [columnName]: newValue };
            }
            return designer;
        }));
    };

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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <EditableField
                                value={designer.name}
                                onChange={(newValue) => handleDesignerChange(designer.id, 'name', newValue)}
                                id={designer.id}
                                columnName="name"
                            />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {designer.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <EditableField
                                value={designer.rate}
                                onChange={(newValue) => handleDesignerChange(designer.id, 'rate', Number(newValue))}
                                id={designer.id}
                                columnName="rate"
                                type="number"
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DesignerTable;