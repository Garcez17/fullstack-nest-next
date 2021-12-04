import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const CREATE_OR_LOGIN_USER = gql`
  mutation($email: String!, $name: String) {
    createOrLoginUser(input: { email: $email, name: $name }) {
      id
      name
    }
  }
`;

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const router = useRouter();

  const [createOrLoginUser, { data }] = useMutation(CREATE_OR_LOGIN_USER);

  useEffect(() => {
    if (data) {
      window.localStorage.setItem('user_id', JSON.stringify(data?.createOrLoginUser.id));
      
      router.push('/messages');
    }
  }, [data, router]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      alert('Insert a valid email');
      return;
    }

    createOrLoginUser({ variables: { email, name } });
  }

  return (
    <div className="container mx-auto h-screen">
      <header className="h-1/4 flex items-center justify-center">
        <p className="text-2xl font-bold italic text-purple-700">ggz Messages</p>
      </header>
      <section className="flex items-center justify-center">
        <div className="w-6/12 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold">Login to your account</h1>
          <p className="text-gray-100 text-opacity-75 my-8">Login or register to have access to all the messages!</p>
          <form className="w-7/12 flex flex-col items-center justify-center" onSubmit={handleSubmit}>
            <input 
              className="w-full rounded-md bg-gray-700 px-4 py-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="text"
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="Name"
            />

            <input
              className="w-full my-2 rounded-md bg-gray-700 px-4 py-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
            />

            <button 
              className="w-full rounded-md bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 h-10 hover:opacity-90 transition duration-500" 
              type="submit"
            >
              Login or register
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
