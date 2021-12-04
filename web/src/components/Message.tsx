type Message = {
  id: string;
  content: string;
  user: {
    id: number;
    name: string;
    email: string;
  }
}

type MessageProps = {
  message: Message;
}

export function Message({ message }: MessageProps) {
  return (
    <div className="bg-gray-900 py-4">
      <div className="bg-gray-900 mb-2">
        <span className="font-bold">{message.user.name} </span>
        <span className="text-gray-500 text-sm ml-2">{message.user.email}</span>
      </div>

      <p>{message.content}</p>
    </div>
  )
}