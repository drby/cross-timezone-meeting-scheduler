"use client";

import { FC, useState, useEffect } from "react";
import { fetchUsers } from "@/actions";

interface User {
  id: number;
  username: string;
  dailyStartTime: string;
  dailyEndTime: string;
}

interface UserAvailabilityCardProps {
  onUserSelectionChange: (selectedUsers: User[]) => void;
}

const UserAvailabilityCard: FC<UserAvailabilityCardProps> = ({ onUserSelectionChange }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      const users = await fetchUsers();
      setUsers(users);
    };
    loadUsers();
  }, []);

  const handleCheckboxChange = (user: User) => {
    setSelectedUsers((prevSelectedUsers) => {
      const isSelected = prevSelectedUsers.some((u) => u.id === user.id);
      const newSelectedUsers = isSelected
        ? prevSelectedUsers.filter((u) => u.id !== user.id)
        : [...prevSelectedUsers, user];
      onUserSelectionChange(newSelectedUsers);
      return newSelectedUsers;
    });
  };

  return (
    <div className="user-availability-card p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">User Availability</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedUsers.some((u) => u.id === user.id)}
                onChange={() => handleCheckboxChange(user)}
                className="mr-2"
              />
              {user.username}
            </label>
            {selectedUsers.some((u) => u.id === user.id) && (
              <div className="ml-6 text-sm text-gray-600">
                Available from {user.dailyStartTime} to {user.dailyEndTime}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAvailabilityCard;
