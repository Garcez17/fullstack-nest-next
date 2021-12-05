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
  message?: Message;
}

export function Message({ message }: MessageProps) {
  const hasMessage = !!message;
  return (
    <div className="bg-gray-900 py-4">
      {message ? (
        <>
          <div className="bg-gray-900 mb-2">
            <span className="font-bold">{message.user.name} </span>
            <span className="text-gray-500 text-sm ml-2">{message.user.email}</span>
          </div>
    
          <p>{message.content}</p>
        </>
      ) : (
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}