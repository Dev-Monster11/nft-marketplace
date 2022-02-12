// @ts-nocheck

import {
  FileImageOutlined,
  HeartOutlined,
  EllipsisOutlined,
  InfoCircleFilled,
  AppstoreOutlined,
  BlockOutlined,
  DollarOutlined,
  PartitionOutlined,
  UploadOutlined,
  MenuOutlined,
  EyeOutlined,
  CameraOutlined,
} from '@ant-design/icons';
import { useWallet } from '@solana/wallet-adapter-react';
import { Button, Col, Row, Spin, Tabs, Card, Badge } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ArtworksView } from '..';
import { Link } from 'react-router-dom';
import { findOneUser, uploadImage } from '../../utils/api';

const { TabPane } = Tabs;

const Owned = () => {
  const owned = [1, 2, 3, 4];
  return (
    <>
      <div className="ownedBtns">
        <div>
          <Button className="ownedBtn leftOwnedBtn">
            <AppstoreOutlined />
            Category
          </Button>
          <Button className="ownedBtn leftOwnedBtn">
            <BlockOutlined />
            Collections
          </Button>
          <Button className="ownedBtn leftOwnedBtn">
            <PartitionOutlined />
            Sale type
          </Button>
          <Button className="ownedBtn leftOwnedBtn">
            <DollarOutlined />
            Price range
          </Button>
        </div>
        <Button className="ownedBtn">
          <span className="ownedBtnSortSpan">Sort</span>
          <MenuOutlined />
          Recently added
        </Button>
      </div>
      <Row>
        {/* {owned.map((e, i) => (
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            key={i}
            className="ownedCardContainer"
          >
            <Card
              hoverable={true}
              className="ownedCard"
              bodyStyle={{ padding: '10px' }}
            >
              <div className="cardTop">
                <div className="cardImages">
                  <img src="/img/artist1.jpeg" className="cardImage" />
                  <img src="/img/artist2.jpeg" className="cardImage mlm10" />
                  <img src="/img/artist3.jpeg" className="cardImage mlm10" />
                </div>
                <EllipsisOutlined />
              </div>
              <div className="cardContent">
                <FileImageOutlined />
              </div>
              <div className="cardFooter">
                <div className="cardFooterTitle">Untitled</div>
                <div className="cardFooterLetter">Not for sale 1/1</div>
                <div className="cardFooterBottom">
                  <span>No bids yet</span>
                  <HeartOutlined />
                </div>
              </div>
            </Card>
          </Col>
        ))} */}
      </Row>
    </>
  );
};

export const ProfileView = () => {
  const { connected, publicKey } = useWallet();
  const history = useHistory();

  const location: any = useLocation();
  const [public_key, setPublickKey] = useState('');
  const [showAddress, setShowAddress] = useState(false);

  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
  const [bannerPreviewUrl, setBannerPreviewUrl] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState(null)

  const _handleImageChange = (e: any) => {
    e.preventDefault();

    const reader = new FileReader();
    const selected = e.target.files[0];

    reader.onloadend = () => {
      setFile(selected);
      reader.result &&
        typeof reader.result == 'string' &&
        setImagePreviewUrl(reader.result);
    };
    uploadImage(selected, publicKey)
    reader.readAsDataURL(selected);
  };

  const _handleImageChange1 = (e: any) => {
    e.preventDefault();

    const reader = new FileReader();
    const selected = e.target.files[0];

    reader.onloadend = () => {
      setFile(selected);
      reader.result &&
        typeof reader.result == 'string' &&
        setBannerPreviewUrl(reader.result);
    };

    reader.readAsDataURL(selected);
  };

  useEffect(() => {
    async function getUser(key) {
      console.log('key = ', key)
      const user = await findOneUser(key)
      user.avatar && setAvatarUrl(user.avatar)
      if (!user.image && localStorage.getItem('registeration')) history.push('/ready-player-me')
    }

    getUser(publicKey ? publicKey : localStorage.getItem('publickey'))
  }, [])

  useEffect(() => {
    (async () => {
      if (!connected) {
        if (location.state && location.state.publicKey)
          setPublickKey(location.state.publicKey);
        else history.push('/');
      }
    })();
  }, [location]);

  const shortPublicKey = key => {
    return key.slice(0, 10) + ' ... ' + key.slice(-10);
  };

  return (
    <div className="profile-page-container">
      <div className="topBackground">
        <div className="avatarContainer">
          <input
            className="fileInput"
            type="file"
            style={{display: 'none'}}
            ref={inputRef}
            onChange={e => _handleImageChange(e)}
          />

          {!imagePreviewUrl && !avatarUrl && <div className="userAvatar"></div>}
          
          {!imagePreviewUrl && avatarUrl && <img src={avatarUrl} className="userAvatar" />}

          {imagePreviewUrl && (
            <img src={imagePreviewUrl} className="userAvatar" />
          )}
          <CameraOutlined
            className="avatar-camera-icon"
            onClick={() => inputRef.current && inputRef.current.click()}
          />
        </div>

        {bannerPreviewUrl && (
            <img src={bannerPreviewUrl} className='banner-image'/>
          )}

        <input
            className="fileInput"
            type="file"
            style={{display: 'none'}}
            ref={bannerInputRef}
            onChange={e => _handleImageChange1(e)}
          />
        <Button className='banner-edit-button' onClick={() => bannerInputRef.current && bannerInputRef.current.click()}>
          <CameraOutlined className='me-1'/> Edit
        </Button>
      </div>
      <div className="infoContainer">
        <div className="user-name">{localStorage.getItem('name')}</div>

        <div className="address desktop-show">
          {showAddress ? (
            <>
              <img src="/sol.svg" />
              <span className="publickey">
                {publicKey?.toBase58() ? publicKey?.toBase58() : public_key}
              </span>
            </>
          ) : (
            <span style={{ fontSize: '14px', marginRight: '5px' }}>
              WalletAddress ....
            </span>
          )}
          {!showAddress && (
            <EyeOutlined
              onClick={() => setShowAddress(true)}
              className="eye-icon"
            />
          )}
        </div>

        <div className="address mobile-show">
          {showAddress ? (
            <>
              <img src="/sol.svg" />
              <span className="publickey">
                {publicKey?.toBase58()
                  ? shortPublicKey(publicKey?.toBase58())
                  : shortPublicKey(public_key)}
              </span>
            </>
          ) : (
            <span style={{ fontSize: '14px', marginRight: '5px' }}>
              WalletAddress ....
            </span>
          )}
          {!showAddress && (
            <EyeOutlined
              onClick={() => setShowAddress(true)}
              className="eye-icon"
            />
          )}
        </div>

        <div className="follow">
          <span className="followSpan mr20">
            {/* <InfoCircleFilled className="infoIcon" /> */}
            followers<span className="ms-2">0</span>
          </span>
          <span className="followSpan">
            {/* <InfoCircleFilled className="infoIcon" /> */}
            following <span className="ms-2">0</span>
          </span>
        </div>
        <div className="infoButtons">
          <Button
            className="editBtn"
            onClick={() => {
              if (location.state && location.state.publicKey) history.push('/');
              else history.push('/editProfile');
            }}
          >
            Edit profile
          </Button>
          {/* <Button className="infoBtn">
            <UploadOutlined />
          </Button>
          <Button className="infoBtn">
            <EllipsisOutlined />
          </Button>
          <Button className="editBtn">
            <Link to="/auction/create/0">Sell NFT</Link>
          </Button> */}
        </div>
      </div>
      <div className="tabContainer">
        <Tabs defaultActiveKey="2" centered>
          {/* <TabPane tab="On sale" key="1">
          </TabPane>
          <TabPane
            tab={
              <>
                <span>Owned</span>
                <span className="ownedBadge">0</span>
              </>
            }
            key="2"
          >
            <Owned></Owned>
          </TabPane> */}
          <TabPane tab="Created" key="3"></TabPane>
          <TabPane tab="Collections" key="4">
            <ArtworksView />
          </TabPane>
          {/* <TabPane tab="Activity" key="5">
          </TabPane> */}
        </Tabs>
      </div>
    </div>
  );
};
