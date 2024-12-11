"use client"

import { login } from "@/actions"
import { useFormState } from "react-dom";



const LoginForm = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [state, formAction] = useFormState<any, FormData>(login, undefined);

    return (
      <form action={formAction}>
        <input required type="text" name="username" placeholder="username"></input>
        <input required type="password" name="password" placeholder="password"></input>
        <button>Login</button>
        {state?.error && <p>{state.error}</p>}
      </form>
    )
  }

  export default LoginForm
