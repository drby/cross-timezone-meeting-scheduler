"use client";

import { FC, FormEvent, useState, useEffect } from "react";
import { useFormState } from "react-dom";

import { getSession, createEvent, fetchUsers } from "@/actions";
import Select from 'react-select';

const CreateEventForm: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [state, formAction] = useFormState<any, FormData>(createEvent, undefined);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [users, setUsers] = useState<{ id: number; username: string }[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<{ value: number; label: string }[]>([]);

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      const session = await getSession();
      if (session.isLoggedIn) {
        setUserId(session.userId ?? null);
      }
    };
    loadSession();
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      const users = await fetchUsers();
      setUsers(users);
    };
    loadUsers();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);

    const formData = new FormData(e.target as HTMLFormElement);
    const userIds = selectedUsers.map(user => user.value);
    formData.set('userIds', userIds.join(','));

    try {
      formAction(formData);
      setSuccessMessage("Event created successfully!");
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };

  const userOptions = users
  .filter(user => user.id.toString() !== userId)
  .map(user => ({
    value: user.id,
    label: user.username,
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 max-w-md mx-auto bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>

      <label htmlFor="title" className="block text-sm font-medium text-gray-700">Event Title</label>
      <input
        required
        type="text"
        name="title"
        id="title"
        placeholder="Event Title"
        className="w-full p-2 border border-gray-300 rounded"
      />

      <label htmlFor="start" className="block text-sm font-medium text-gray-700">Event Start</label>
      <input
        required
        type="datetime-local"
        name="start"
        id="start"
        placeholder="Event Start"
        className="w-full p-2 border border-gray-300 rounded"
      />

      <label htmlFor="end" className="block text-sm font-medium text-gray-700">Event End</label>
      <input
        type="datetime-local"
        name="end"
        id="end"
        placeholder="Event End"
        className="w-full p-2 border border-gray-300 rounded"
      />

      <label htmlFor="users" className="block text-sm font-medium text-gray-700">Select Users</label>
      <Select
        isMulti
        options={userOptions}
        value={selectedUsers}
        onChange={(newValue) => setSelectedUsers(newValue as { value: number; label: string }[])}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Select Users"
        id="users"
      />

      <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create Event</button>

      {state?.error && <p className="text-red-500 mt-2">{state.error}</p>}
      {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
    </form>
  );
};

export default CreateEventForm;
