// @ts-nocheck

import { MetaplexModal } from '@oyster/common';
import React, { useState, useRef, useEffect } from 'react';

export const CountdownView = () => {
  // We need ref in this, because we are dealing
  // with JS setInterval to keep track of it and
  // stop it when needed
  const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState('00:00:00');

  const getTimeRemaining = e => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor(((total / 1000) * 60 * 60) % 24);

    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = e => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the begining of the variable
      setTimer(
        (hours > 9 ? hours : '0' + hours) +
          ':' +
          (minutes > 9 ? minutes : '0' + minutes) +
          ':' +
          (seconds > 9 ? seconds : '0' + seconds),
      );
    }
  };

  const clearTimer = e => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer('00:00:00');

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date('February 12, 2022 08:00:00');

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds());
    console.log(deadline);
    return deadline;
  };

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  const onClickReset = () => {
    clearTimer(getDeadTime());
  };

  return (
    <>
      <MetaplexModal closable={false} visible centered>
        <div className=" text-center">
          {/* <h1 className="py-n1 fw-bold timer_title">WEB3 FASHION SHOW</h1>
          <h1 className="timer">{timer}</h1>
          <div className="d-flex justify-content-center timer_indication">
            <h4 className="hours">Hours</h4>
            <h4 className="mx-5">Minutes</h4>
            <h4>Second</h4>
          </div> */}
          <img
            src="Logo/QueendomDark.png"
            style={{ width: '300px', marginTop: '20px' }}
          />
          <h1 className="fw-bold">Coming Soon</h1>
        </div>
      </MetaplexModal>
    </>
  );
};
