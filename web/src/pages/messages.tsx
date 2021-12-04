import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import { Message } from "../components/Message";



export const GET_MESSAGES_FROM_USER = gql`
  query {
    messages {
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

export default function Messages() {
  const router = useRouter();

  const { loading, data } = useQuery(
    GET_MESSAGES_FROM_USER, {
      variables: { user_id: router.query.id }
    }
  );
  
  if (loading) return <p>Loading ...</p>;

  return (
    <div className="container mx-auto h-screen flex flex-col">
      <header className="flex align-center justify-center pt-8 pb-4">
        <form className="flex flex-col align-end w-2/4">
          <textarea 
            className="w-full h-24 resize-none rounded-md bg-gray-700 px-4 py-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />

          <button className="bg-purple-500 self-end rounded-md p-2 w-44 mt-2">Enviar mensagem</button>
        </form>
      </header>
      <section className="flex align-center justify-center">
        <div className="flex flex-col w-2/4">
          <ul className="flex mx-auto">
            <li>
              <button className="h-12 pr-4 border-b-2 border-purple-500 hover:opacity-90">Mensagens gerais</button>
            </li>
            <li>
              <button className="h-12 pl-4 border-b-2 border-gray-500 opacity-50 hover:opacity-40">Minhas mensagens</button>
            </li>
          </ul>
        
          <article className="flex flex-col w-full mt-4 divide-y divide-gray-700">
            {data?.messages.map(item => <Message key={item.id} message={item} />)}
          </article>
        </div>
      </section>
    </div>
  )
}