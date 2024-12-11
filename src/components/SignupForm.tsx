"use client";

import { signup } from "@/actions";
import { useFormState } from "react-dom";

const SignupForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [state, formAction] = useFormState<any, FormData>(signup, undefined);

  return (
    <form action={formAction}>
      <input required type="text" name="username" placeholder="Username" />
      <input required type="password" name="password" placeholder="Password" />
      <button>Sign Up</button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
};

export default SignupForm;
