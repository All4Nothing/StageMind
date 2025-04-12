import { useState } from 'react';
import { Pencil } from 'lucide-react'; // Make sure lucide-react is installed

interface ParticipantCardProps {
  name: string
  role: string
  description: string
  onChange?: (updated: { role: string; description: string }) => void
}

export default function ParticipantCard({ name, role, description, onChange }: ParticipantCardProps) {
  const [editableRole, setEditableRole] = useState(role);
  const [editableDescription, setEditableDescription] = useState(description);
  const [isEditing, setIsEditing] = useState(false);

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditableRole(value);
    onChange?.({ role: value, description: editableDescription });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setEditableDescription(value);
    onChange?.({ role: editableRole, description: value });
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl flex items-start gap-3 relative">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
          {name.charAt(0)}
        </div>
        <button
          className="mt-1 p-1 text-gray-300 hover:text-white transition"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Pencil size={14} />
        </button>
      </div>

      <div className="flex flex-col w-full">
        <h4 className="text-white font-medium text-sm">{name}</h4>

        {isEditing ? (
          <>
            <input
              className="text-gray-400 text-xs bg-transparent border-b border-gray-600 focus:outline-none focus:border-white mb-1"
              value={editableRole}
              onChange={handleRoleChange}
            />
            <textarea
              className="text-gray-300 text-xs bg-transparent border border-gray-600 rounded p-1 resize-none focus:outline-none focus:border-white"
              rows={3}
              value={editableDescription}
              onChange={handleDescriptionChange}
            />
          </>
        ) : (
          <>
            <p className="text-gray-400 text-xs">{editableRole}</p>
            <p className="text-gray-300 text-xs mt-1">{editableDescription}</p>
          </>
        )}
      </div>
    </div>
  );
}
