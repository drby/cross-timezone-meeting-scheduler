"use client"

import { login } from "@/actions";
import { useFormState } from "react-dom";

const LoginForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [state, formAction] = useFormState<any, FormData>(login, undefined);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form action={formAction} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            required
            type="text"
            name="username"
            id="username"
            placeholder="username"
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            required
            type="password"
            name="password"
            id="password"
            placeholder="password"
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
        {state?.error && <p className="text-red-500 mt-2">{state.error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
