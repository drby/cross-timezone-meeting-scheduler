"use client"

import { FC, useState } from "react";
import Calendar from "@/components/Calendar";
import CreateEventForm from "@/components/authentication/CreateEventForm";
import UserAvailabilityCard from "@/components/UserAvailabilityCard";

interface User {
  id: number;
  username: string;
  dailyStartTime: string;
  dailyEndTime: string;
}


const CalendarPage: FC = () => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const handleUserSelectionChange = (users: User[]) => {
    setSelectedUsers(users);
  };
  return (
    <>
      <Calendar selectedUsers={selectedUsers} />
      <div className="flex justify-between max-w-4xl mx-auto p-4 space-x-4">
        <div className="w-1/2">
          <CreateEventForm />
        </div>
        <div className="w-1/2">
          <UserAvailabilityCard onUserSelectionChange={handleUserSelectionChange} />
        </div>
      </div>
    </>
  )
}

export default CalendarPage