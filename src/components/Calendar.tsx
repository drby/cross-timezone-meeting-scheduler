"use client"

import { FC } from "react";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar: FC = () => {
  const events = [
    {
      title: "Test Event",
      start: "2024-12-19T00:18:46.000Z",
      end: "2024-12-20T00:18:46.000Z",
      timezone: "America/New_York"
    },
    {
      title: "doge Event",
      start: "2024-12-26T00:18:46.000Z",
      end: "2024-12-29T00:18:46.000Z",
      timezone: "America/New_York"
    },
  ];

  const handleEventClick = (clickInfo: { event: { title: string } }) => {
    alert(`Event: ${clickInfo.event.title}`);
  };

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