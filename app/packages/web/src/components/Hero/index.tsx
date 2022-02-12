/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Button, Typography, Space } from 'antd';
import { MetaplexOverlay } from '@oyster/common';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

const Hero = function () {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const { Title } = Typography;
  return (
    <div className="hero_element">
      <h1 className="hero_title">
        Metaverse <br /> Fashion Show
      </h1>
      {/* <h3 className="hero_subtitle">
        Real-Time 3D Streaming for Limitless Experiences
      </h3> */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button type="primary" className="hero_button">
          {/* <Link to='/client'>Connect</Link> */}
          <Link to="/chat" className="fw-bold">
            Enter
          </Link>
        </Button>
        {/* <span style={{ width: '2rem' }} />
        <Button onClick={() => setOverlayVisible(true)}>Watch Video</Button> */}
      </div>
      <MetaplexOverlay
        visible={overlayVisible}
        onCancel={() => setOverlayVisible(false)}
        style={{ position: 'relative' }}
        className="metaplex-fullwidth"
        centered
        width="80vw"
      >
        <ReactPlayer controls url="video/demo.mp4" width="100%" height="100%" />
      </MetaplexOverlay>
    </div>
  );
};

export default Hero;
