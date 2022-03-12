/**
 * Returns appointments for day
 * @param {*} state 
 * @param {*} day 
 */
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

/**
 * Returns interviews correspoind to interview id
 * @param {*} state 
 * @param {*} interview 
 */
export function getInterview (state, interview) {
  if (!interview) {
    return null;
  }

  return {
    student: interview.student, 
    interviewer: Object.values(state.interviewers).filter(interviewer => interview.interviewer === interviewer.id)[0]
  }
}

/**
 * Returns an array of interviewer object of day
 * @param {*} state 
 * @param {*} day 
 */
export function getInterviewersForDay (state, day) {
  let interviewerArr = [];
  const list = state.days.filter(d => d.name === day)[0]; 

  if (!state.days || !list) {
    return [];
  }

  for (const interviewer of list.interviewers) {
    interviewerArr.push(state.interviewers[interviewer])
  }
  
  return interviewerArr;
}