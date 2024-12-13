import { FC } from "react";
import Calendar from "@/components/Calendar";
import CreateEventForm from "@/components/authentication/CreateEventForm";


const CalendarPage: FC = () => {
  return (
    <>
      <Calendar />
      <CreateEventForm />
    </>
  )
}

export default CalendarPage