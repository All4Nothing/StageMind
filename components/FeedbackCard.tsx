import Image from 'next/image';

interface FeedbackCardProps {
  name: string;
  role: string;
  feedback: string;
  avatarColor?: string;
  imageSrc?: string;
}

export function FeedbackCard({ name, role, feedback, avatarColor, imageSrc }: FeedbackCardProps) {
    return (
      <div className="bg-gray-900/70 p-4 rounded-lg border border-gray-700">
        <div className="flex items-center gap-3 mb-2">
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={`${name}'s avatar`}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <div>
            <h4 className="text-white font-medium">{name}</h4>
            <p className="text-gray-400 text-xs">{role}</p>
          </div>
        </div>
        <p className="text-gray-300 text-sm">{feedback}</p>
      </div>
    )
  }