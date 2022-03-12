import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData () {
  const [state, setState] = useState({
    day: 'Monday', 
    days: [],
    appointments: {}, 
    interviewers: {}}
  );
  const setDay = day => setState(prev => ({...prev, day}));

  //get multiple data from api using Pormise.all
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'), 
      axios.get('/api/appointments'), 
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])

  //book and interview by the interview id and the interview info
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //update days when an interview is added
    let days = [...state.days];

    for (const d of days) {
      if (d.name === state.day && !state.appointments[id].interview) {
        d.spots --;
      }
    }

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => setState({...state, appointments, days}))
  }
  
//cancel an interview by the interview id
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

  //update days when a interview is canceled

    let days = [...state.days];

    for (const d of days) {
      if (d.name === state.day) {
        d.spots ++;
      }
    }

    return axios.delete(`/api/appointments/${id}`, appointment)
    .then(()=> setState({...state, appointments, days}))
  }

  return {state, setDay, bookInterview, cancelInterview};
}