"use client";

import { FC } from "react";
import { useFormState } from "react-dom";

import { createEvent } from "@/actions";

const CreateEventForm: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [state, formAction] = useFormState<any, FormData>(createEvent, undefined);

  console.log(state);

  return (
    <form action={formAction} className="space-y-6 p-4 max-w-md mx-auto bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>
      <input
        required
        type="text"
        name="title"
        placeholder="Event Title"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <textarea
        name="description"
        placeholder="Event Description"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        required
        type="datetime-local"
        name="start"
        placeholder="Event Start"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="datetime-local"
        name="end"
        placeholder="Event End"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        required
        type="text"
        name="userIds"
        placeholder="User IDs (comma separated)"
        className="w-full p-2 border border-gray-300 rounded"
      />

      <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create Event</button>

      {state?.error && <p className="text-red-500 mt-2">{state.error}</p>}
    </form>
  );
};

export default CreateEventForm;
