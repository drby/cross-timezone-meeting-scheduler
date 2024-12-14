"use client";

import { FC, useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { fetchUserCalendar, getSession } from "@/actions";

interface CalendarEvent {
  title: string;
  start: string;
  end: string;
  timezone?: string;
}

interface User {
  id: number;
  username: string;
  dailyStartTime: string;
  dailyEndTime: string;
}

interface CalendarProps {
  selectedUsers: User[];
}

const Calendar: FC<CalendarProps> = ({ selectedUsers }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [userTimeZone, setUserTimeZone] = useState<string | null>(null);

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
    const loadCalendar = async () => {
      if (userId) {
        const { calendar, preferredTimeZone } = await fetchUserCalendar(userId);
        if (calendar && calendar.events) {
          const userEvents = calendar.events.map(event => ({
            title: event.title,
            start: event.start.toISOString(),
            end: event.end.toISOString(),
          }));
          setEvents(userEvents);
          setUserTimeZone(preferredTimeZone);
        }
      }
    };
    loadCalendar();
  }, [userId]);

  const handleEventClick = (clickInfo: { event: { title: string } }) => {
    alert(`Event: ${clickInfo.event.title}`);
  };

  const backgroundEvents = selectedUsers.flatMap(user => {
    const startTime = new Date();
    const [startHour, startMinute] = user.dailyStartTime.split(':').map(Number);
    startTime.setHours(startHour, startMinute, 0, 0);

    const endTime = new Date();
    const [endHour, endMinute] = user.dailyEndTime.split(':').map(Number);
    endTime.setHours(endHour, endMinute, 0, 0);

    return {
      title: `${user.username}'s Availability`,
      start: startTime.toISOString(),
      end: endTime.toISOString(),
      display: 'background',
      backgroundColor: '#d1e7dd',
      borderColor: '#d1e7dd',
    };
  });

  return (
    <div className="calendar-container mx-auto p-4 max-w-4xl">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={[...events, ...backgroundEvents]}
        eventClick={handleEventClick}
        timeZone={userTimeZone ?? undefined}
        titleFormat={{ timeZoneName: 'short' }}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
      />
    </div>
  );
};

export default Calendar;
