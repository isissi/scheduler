import { useState } from "react";

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (addMode, replace = false) => {
    setMode(addMode);
    if (!replace) {
      setHistory(prev => [...prev, addMode]);
    } else {
      setHistory(history.slice(0, history.length - 1).concat(addMode));
    }
  };

  const back = () => { 
    if (history.length > 1) {
      setHistory(history.slice(0, history.length - 1)); 
      setMode(history[history.length - 2]);
    }
  };

  return {
    mode, 
    transition, 
    back
  }
}