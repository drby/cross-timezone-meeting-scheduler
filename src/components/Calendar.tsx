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
  }];

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

export default Calendar;