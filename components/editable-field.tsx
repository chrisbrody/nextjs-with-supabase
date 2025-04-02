import React, { useState } from 'react';
import { createClient } from "@/utils/supabase/client";

interface EditableFieldProps {
    value: string | number;
    onChange: (newValue: string | number) => void;
    id: string;
    columnName: string;
    type?: 'text' | 'number' | 'email'; // Optional type for the input
}

const EditableField: React.FC<EditableFieldProps> = ({ value, onChange, id, columnName, type = 'text' }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    const supabase = createClient();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleInputChange called', e.target.value); // Log input change
        setInputValue(e.target.value);
    };

    const handleInputBlur = async () => {
        console.log('handleInputBlur called'); // Log when blur occurs
        setIsEditing(false);
        if (inputValue !== value) {
            console.log('inputValue !== value', inputValue, value); // Log value comparison
            try {
                const updates = { [columnName]: inputValue };
                console.log('updates object', updates); // Log updates object

                const { error } = await supabase
                    .from('designers')
                    .update(updates)
                    .eq('id', id);

                if (error) {
                    console.error('Error updating record:', error);
                    console.log('Supabase error object', error); // Log Supabase error object
                    // Revert to the original value if the update fails
                    setInputValue(value);
                    alert('Failed to update. Please try again.');
                } else {
                    console.log('Supabase update successful'); // Log success
                    onChange(inputValue); // Notify the parent component of the change
                }
            } catch (error) {
                console.error('Error updating record:', error);
                console.log('Catch error object', error); // Log catch error object
                setInputValue(value);
                alert('An unexpected error occurred. Please try again.');
            }
        } else {
            console.log('inputValue === value, no update needed'); // Log when no update is needed
        }
    };

    return (
        <>
            {isEditing ? (
                <input
                    type={type}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="border rounded p-1 w-full"
                    autoFocus // Automatically focus the input when editing starts
                />
            ) : (
                <span onClick={() => setIsEditing(true)} className="cursor-pointer">
                    {value}
                </span>
            )}
        </>
    );
};

export default EditableField;