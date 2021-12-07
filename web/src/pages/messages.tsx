import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import { CREATE_MESSAGE, GET_MESSAGES, GET_MESSAGES_FROM_USER, MESSAGES_SUBSCRIPTION } from "../utils/graphqlGql";
import { Message } from "../components/Message";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Messages() {
  const cookies = parseCookies();

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [typeMessages, setTypeMessages] = useState<'general' | 'my-messages'>('general');

  const { loading, data, refetch } = useQuery(
    typeMessages === 'general' ? GET_MESSAGES : GET_MESSAGES_FROM_USER, {
      variables: { user_id: cookies['user_id'] },
    },
  );

  const { data: subsData } = useSubscription(
    MESSAGES_SUBSCRIPTION
  );

  const [createMessage] = useMutation(CREATE_MESSAGE);

  useEffect(() => {
    if (data) {
      setMessages(data[typeMessages === 'general' ? 'getMessages' : 'getMessagesFromUser'])
    }
  }, [data, typeMessages]);

  useEffect(() => {
    if (subsData?.messageAdded) {
      const findMessageFromArr = messages.find(msg => msg.id === subsData?.messageAdded.id);
  
      if (findMessageFromArr) return;

      const updatedMessages = [subsData?.messageAdded, ...messages];

      if (typeMessages === 'my-messages') {
        subsData?.messageAdded.user.id === Number(cookies['user_id']) &&
          setMessages(updatedMessages);
      } else {
        setMessages(updatedMessages);
      }

      refetch();
    }
  }, [subsData?.messageAdded.id, typeMessages]);


  async function handleSubmit(e) {
    e.preventDefault();

    createMessage({ variables: { content: message, authorId: Number(cookies['user_id'])  } });
    setMessage('');
  }

  return (
    <div className="container mx-auto h-screen flex flex-col">
      <header className="flex align-center justify-center pt-8 pb-4">
        <form className="flex flex-col align-end w-2/4" onSubmit={handleSubmit}>
          <textarea 
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="w-full h-24 resize-none rounded-md bg-gray-700 px-4 py-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />

          <button 
            type="submit"
            className="bg-purple-500 self-end rounded-md p-2 w-44 mt-2"
          >
            Enviar mensagem
          </button>
        </form>
      </header>
      <section className="flex align-center justify-center">
        <div className="flex flex-col w-2/4">
          <ul className="flex mx-auto">
            <li>
              <button 
                className={`h-12 pr-4 border-b-2 ${typeMessages === 'general' ? 'border-purple-500 hover:opacity-90' : 'border-gray-500 opacity-50 hover:opacity-40'} `}
                onClick={() => setTypeMessages('general')}
              >
                Mensagens gerais
              </button>
            </li>
            <li>
              <button 
                className={`h-12 pl-4 border-b-2 ${typeMessages === 'my-messages' ? 'border-purple-500 hover:opacity-90' : 'border-gray-500 opacity-50 hover:opacity-40'} `}
                onClick={() => setTypeMessages('my-messages')}
              >
                Minhas mensagens
              </button>
            </li>
          </ul>
        
          <article className="flex flex-col w-full mt-4 divide-y divide-gray-700">
            {loading ? (
              <>
                <Message />
                <Message />
                <Message />
                <Message />
              </>
            ) : messages?.map(item => <Message key={item.id} message={item} />)}
          </article>
        </div>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async () => {
  return {
    props: {}
  }
});