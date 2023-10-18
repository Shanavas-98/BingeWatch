/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';

function useCountdown() {
  const [secLeft, setSecLeft] = useState(0);
  useEffect(() => {
    if (secLeft <= 0) return;
    const timeout = setTimeout(() => {
      setSecLeft(secLeft - 1);
    }, 1000);
    return (() => clearTimeout(timeout));
  }, [secLeft]);
  function setTimer(sec) {
    setSecLeft(sec);
  }
  return { secLeft, setTimer };
}

export default useCountdown;
