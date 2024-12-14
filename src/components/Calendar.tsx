"use client"

import { FC, useEffect, useState } from "react";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { fetchUserCalendar, getSession } from "@/actions";

interface CalendarEvent {
  title: string;
  start: string;
  end: string;
  timezone?: string;
}

const Calendar: FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
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
    const loadCalendar = async () => {
      const session = await getSession();
      if (session.isLoggedIn) {
        if (userId) {
          const calendar = await fetchUserCalendar(userId);
          if (calendar && calendar.events) {
            const userEvents = calendar.events.map(event => ({
              title: event.title,
              start: event.start.toISOString(),
              end: event.end.toISOString(),
            }));
            setEvents(userEvents);
          }
        }
      }
    };
    loadCalendar();
  }, [userId]);

  const handleEventClick = (clickInfo: { event: { title: string } }) => {
    alert(`Event: ${clickInfo.event.title}`);
  };

  console.log(events);

  return (
    <div className="calendar-container mx-auto p-4 max-w-4xl">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events?.map(event => ({
          ...event,
          start: event.start,
          end: event.end,
          display: 'block',
          extendedProps: {
            timezone: event.timezone,
          },
        }))}
        eventClick={handleEventClick}
        timeZone="America/New_York" // dynamic
      />
    </div>
  );
};

export default Calendar;