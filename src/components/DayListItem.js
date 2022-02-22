import React from "react";
import classNames from "classnames";
import 'components/DayListItem.scss';

const formatSpots = (num) => {

  if (num === 1) {
    return '1 spot remaining';
  } else if (num === 0) {
    return 'no spots remaining';
  } else {
    return `${num} spots remaining`;
  }
}

export default function DayListItem(props) {
  let dayClass = classNames('day-list__item', {'day-list__item--selected': props.selected, 'day-list__item--full': props.spots === 0});

  const spotMessage = formatSpots(props.spots);

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className={"text--regular"}>{props.name}</h2>
      <h3 className="text--light">{spotMessage}</h3>
    </li>
  );
}