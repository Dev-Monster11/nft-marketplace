// @ts-nocheck

import { MetaplexModal } from '@oyster/common';
import React, { useState, useRef, useEffect } from 'react';
import { useTheme, Theme } from '../../contexts/themecontext';

export const CountdownView = () => {
  const { theme, setTheme } = useTheme();
  const [countdownDate, setCountdownDate] = useState(
    new Date('February 11, 2022 08:00:00').getTime(),
  );
  const [state, setState] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setInterval(() => setNewTime(), 1000);
  }, []);

  const setNewTime = () => {
    if (countdownDate) {
      const currentTime = new Date().getTime();

      const distanceToDate = countdownDate - currentTime;

      let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      let minutes = Math.floor(
        (distanceToDate % (1000 * 60 * 60)) / (1000 * 60),
      );
      let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

      const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      days = `${days}`;
      if (numbersToAddZeroTo.includes(hours)) {
        hours = `0${hours}`;
      } else if (numbersToAddZeroTo.includes(minutes)) {
        minutes = `0${minutes}`;
      } else if (numbersToAddZeroTo.includes(seconds)) {
        seconds = `0${seconds}`;
      }

      setState({ days: days, hours: hours, minutes, seconds });
    }
  };

  return (
    <>
      <MetaplexModal closable={false} visible centered>
        <div className=" text-center">
          <img
            src={
              theme === Theme.Dark
                ? 'Logo/QueendomDark.png'
                : 'Logo/QueendomLight.png'
            }
            style={{ width: '250px', marginTop: '20px' }}
          />
          <h1 className="py-n1 fw-bold timer_title">WEB3 FASHION SHOW</h1>
          <div className="countdown-wrapper">
            <div className="time-section">
              <div className="time">{state.hours || '00'}</div>
              <small className="time-text">Hours</small>
            </div>
            <div className="time-section">
              <div className="time">:</div>
            </div>
            <div className="time-section">
              <div className="time">{state.minutes || '00'}</div>
              <small className="time-text">Minutes</small>
            </div>
            <div className="time-section">
              <div className="time">:</div>
            </div>
            <div className="time-section">
              <div className="time">{state.seconds || '00'}</div>
              <small className="time-text">Seconds</small>
            </div>
          </div>
        </div>
        {/* <img
            src="Logo/QueendomDark.png"
            style={{ width: '300px', marginTop: '20px' }}
          />
          <h1 className="fw-bold">Coming Soon</h1> */}
      </MetaplexModal>
    </>
  );
};
