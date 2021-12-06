import { useMutation, useQuery, useSubscription } from "@apollo/client";
import gql from "graphql-tag";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { Message } from "../components/Message";
import { withSSRAuth } from "../utils/withSSRAuth";

export const GET_MESSAGES = gql`
  query {
    getMessages {
      id
      content
      user {
        id
        name
        email
      }
    }
  }
`;

export const GET_MESSAGES_FROM_USER = gql`
  query($user_id: String!) {
    getMessagesFromUser(user_id: $user_id) {
      id
      content
      user {
        id
        name
        email
      }
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation($content: String!, $authorId: Float!) {
    createMessage(input: { content: $content, authorId: $authorId }) {
      id
      content
    }
  }
`;

const MESSAGES_SUBSCRIPTION = gql`
  subscription MessageAdded {
      messageAdded {
      id
      authorId
      content
      user {
        id
        email
        name
      }
    }
  }
`;

export default function Messages() {
  const cookies = parseCookies();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [typeMessages, setTypeMessages] = useState<'general' | 'my-messages'>('general');

  const { loading, data } = useQuery(
    typeMessages === 'general' ? GET_MESSAGES : GET_MESSAGES_FROM_USER, {
      variables: { user_id: cookies['user_id'] }
    }
  );

  const [createMessage] = useMutation(CREATE_MESSAGE);

  const { data: subsData } = useSubscription(
    MESSAGES_SUBSCRIPTION
  );

  useEffect(() => {
    if (data) {
      setMessages(data[typeMessages === 'general' ? 'getMessages' : 'getMessagesFromUser'])
    }
  }, [data, typeMessages]);

  useEffect(() => {
    if (subsData?.messageAdded) {
      const updatedMessages = [subsData?.messageAdded, ...messages];

      if (typeMessages === 'my-messages') {
        subsData?.messageAdded.user.id === Number(cookies['user_id']) &&
          setMessages(updatedMessages);
      } else {
        setMessages(updatedMessages);
      }
    }
  }, [subsData?.messageAdded.id]);


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