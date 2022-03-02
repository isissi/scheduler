export function getAppointmentsForDay (state, day) {
  let appointmentArr = [];

  let validDay = state.days.filter(d => d.name === day)[0];
  if (!state.days || !validDay) {
    return [];
  }

  for (const apt of validDay.appointments) {
    appointmentArr.push(state.appointments[apt]);
  }
  
  return appointmentArr;
}