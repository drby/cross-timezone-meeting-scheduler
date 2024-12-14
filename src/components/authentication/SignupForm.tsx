"use client";
import { FC } from "react";
import { useFormState } from "react-dom";

import { signup } from "@/actions";
import timezones from "timezones-list";

const SignupForm: FC = () => {
  interface SignupFormState {
    error: string | undefined;
  }

  const initialState: SignupFormState = { error: undefined };
  const [state, formAction] = useFormState<SignupFormState, FormData>(signup, initialState);

  return (
    <form action={formAction} className="space-y-6 p-4 max-w-md mx-auto bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <input
        required
        type="text"
        name="username"
        placeholder="Username"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        required
        type="password"
        name="password"
        placeholder="Password"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <select
        required
        name="preferredTimeZone"
        className="w-full p-2 border border-gray-300 rounded"
      >
        {timezones.map((timezone) => (
          <option key={timezone.tzCode} value={timezone.tzCode}>
            {timezone.label}
          </option>
        ))}
      </select>
      <div className="flex flex-col mt-4">
        <label className="mb-2 font-medium">Choose Working Hours</label>
        <div className="flex gap-4 items-center">
          <label className="flex-shrink-0">From</label>
          <input
            required
            type="time"
            name="dailyStartTime"
            placeholder="Daily Start Time"
            className="p-2 border border-gray-300 rounded ml-2"
          />
          <label className="flex-shrink-0 ml-4">To</label>
          <input
            required
            type="time"
            name="dailyEndTime"
            placeholder="Daily End Time"
            className="p-2 border border-gray-300 rounded ml-2"
          />
        </div>
      </div>
      <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Sign Up</button>
      {state?.error && <p className="text-red-500 mt-2">{state.error}</p>}
    </form>
  );
};

export default SignupForm;
