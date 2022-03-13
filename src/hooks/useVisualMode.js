import { useState } from "react";

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (addMode, replace = false) => {
    if (!replace) {
      setHistory(prev => [...prev, addMode]);
    } else {
    //Change history to a copy of the history with newMode at the end
      setHistory(prev => prev.slice(0, -1));
      console.log(history);
      setHistory(prev => [...prev, addMode]);
    }
    setMode(addMode);
  };

  const back = () => { 
    //Checks if history has at least two items
    if (history.length > 1) {
      setHistory(history.slice(0, -1));
      setMode(history[history.length - 2]);
    }
  };

  return {
    mode, 
    transition, 
    back
  }
}