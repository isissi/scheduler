import React from "react";

export default function Appointment (props) {

  return (
    <article className="appointment">
      {!props.time ? 'No Appointments' : `Appointment at ${props.time}`}
    </article>
  )
}