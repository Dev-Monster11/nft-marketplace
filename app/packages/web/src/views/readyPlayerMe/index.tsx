// @ts-nocheck

import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const ReadyPlayerMeView = () => {
  const history = useHistory();

  useEffect(() => {
    function receiveMessage(event) {
      // Check if the received message is a string and a glb url
      // if not ignore it, and print details to the console
      if (
        typeof event.data === 'string' &&
        event.data.startsWith('https://') &&
        event.data.endsWith('.glb')
      ) {
        const url = event.data;

        console.log(`Avatar URL: ${url}`);
        
        /**
         * TODO
         * Implement save avatar url to db code here
         * After success redirect to chat page
         */
        history.push({
          pathname: "/chat",
          state: { fromRPM: true }
        });

      } else {
        console.log(`Received message from unknown source: ${event.data}`);
      }
    }

    window.addEventListener('message', receiveMessage, false);
    return () => window.removeEventListener('message', receiveMessage);
  });
  return (
    <React.Fragment>
      <div className="ready-player-me">
        <div className="ready-player-me-content">
          <iframe
            id="iframe"
            width="1280"
            height="800"
            className="content"
            style={{ display: 'block', margin: '0 auto' }}
            allow="camera *; microphone *"
            src="https://demo.readyplayer.me/"
          ></iframe>
        </div>
      </div>
    </React.Fragment>
  );
};
