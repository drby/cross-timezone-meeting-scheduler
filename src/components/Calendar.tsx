"use client"

import { FC } from "react";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const CalendarCard: FC = () => {

  const events = [
    {
      title: "Test Event",
      start: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), // Tomorrow
      end: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), // Tomorrow
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
        events={events}
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default CalendarCard;