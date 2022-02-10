// @ts-nocheck

import { Button, Col, Row, Input, Divider } from 'antd';
import React, {  useState, useRef,  } from 'react';
import { useHistory } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { useDispatch } from 'react-redux';
import { AddProfile } from '../../store/actions/profileAction';

export const EditProfileView = () => {
  const { connected, publicKey } = useWallet();
  const history = useHistory();
  !connected && history.push('/');

  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
  const [bannerPreviewUrl, setBannerPreviewUrl] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const [profiledata, setprofiledata] = useState({
    Display_name: '',
    Custom_Url: '',
    Bio: '',
    Twitter_Username: '',
    Personal_site: '',
    Email: '',
    Profile_URL: '',
    Banner_URL: '',
  });
const dispatch = useDispatch()
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

    reader.readAsDataURL(selected);
  };

  const _handleBannerChange = (e: any) => {
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
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setprofiledata(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const UpdateProfile = () => {
    console.log(profiledata)
    dispatch(AddProfile(profiledata))
}
  return (
    <div className="editProfileContainer">
      <h1>Edit Profile</h1>
      <p className="description">
        You can set preferred display name, create your branded profile URL and
        manage other personal settings
      </p>
      <Row className="mainContainer">
        <Col md={6} className="rightContainer mobile-show">
          <h3>Change your profile picture</h3>
          <input
            className="fileInput"
            type="file"
            ref={inputRef}
            onChange={e => _handleImageChange(e)}
          />

          {!imagePreviewUrl && <div className="preview"></div>}
          {imagePreviewUrl && <img src={imagePreviewUrl} className="preview" />}
          <p className="imageDescription">
            We recommended an image of at least 300 * 300. Gifs works too. Max
            5mb
          </p>
          <Button
            className="fileButton"
            onClick={() => inputRef.current && inputRef.current.click()}
          >
            Choose file
          </Button>
          <Divider />
          <h3>Change your banner</h3>
          <input
            className="fileInput"
            type="file"
            ref={bannerInputRef}
            onChange={e => _handleBannerChange(e)}
          />

          {!bannerPreviewUrl && <div className="banner_preview"></div>}
          {bannerPreviewUrl && (
            <img src={bannerPreviewUrl} className="banner_preview" />
          )}
          <p className="imageDescription mt-3">
            We recommended an image of at least xxx * xxx.
            <br /> Max 5mb
          </p>
          <Button
            className="fileButton"
            onClick={() =>
              bannerInputRef.current && bannerInputRef.current.click()
            }
          >
            Choose file
          </Button>
        </Col>

        <Col md={18} className="leftContainer">
          <div className="inputContainer">
            <div className="customLabel">Display name</div>
            <Input
              className="customInput"
              placeholder="Enter your display name"
              value={profiledata.Display_name}
              type="text"
              onChange={handleChange}
              name="Display_name"
            ></Input>
          </div>
          <div className="inputContainer">
            <div className="customLabel">Custom Url</div>
            <Input
              className="customInput"
              placeholder="Enter your custom url"
              value={profiledata.Custom_Url}
              type="text"
              onChange={handleChange}
              name="Custom_Url"
            ></Input>
          </div>
          <div className="inputContainer">
            <div className="customLabel">Bio</div>
            <Input
              className="customInput"
              placeholder="Tell about yourself in a few words"
              value={profiledata.Bio}
              type="text"
              onChange={handleChange}
              name="Bio"
            ></Input>
          </div>
          <div className="inputContainer">
            <div className="customLabel">Twitter Username</div>
            <div className="labelDescription">
              Link your Twitter accout to gain more trust on the marketplace
            </div>
            <Input
              className="customInput"
              placeholder="Enter your in Twitter"
              value={profiledata.Twitter_Username}
              type="text"
              onChange={handleChange}
              name="Twitter_Username"
            ></Input>
          </div>
          <div className="inputContainer">
            <div className="customLabel">Personal site or portfolio</div>
            <Input
              className="customInput"
              placeholder="https://"
              value={profiledata.Personal_site}
              type="text"
              onChange={handleChange}
              name="Personal_site"
            ></Input>
          </div>
          <div className="inputContainer">
            <div className="customLabel">Email</div>
            <div className="labelDescription">
              Your email for marketplace notifications
            </div>
            <Input
              className="customInput"
              placeholder="Enter your email"
              value={profiledata.Email}
              type="email"
              onChange={handleChange}
              name="Email"
            ></Input>
          </div>
          <div className="verifyContainer">
            <div>
              <p className="verifyTitle">Verification</p>
              <p className="verifyContent">
                Proceed with verification processes to get more visibility and
                gain trust on Rarible Marketplace. Please allow up to several
                weeks for the process.
              </p>
            </div>
            <div>
              <Button className="verifyBtn">Get verified</Button>
            </div>
          </div>
          <div className="updateBtnContainer">
            <Button className="updateBtn" onClick={()=>UpdateProfile()} >Update profile</Button>
          </div>
        </Col>
        <Col md={6} className="rightContainer desktop-show">
          <h3>Change your profile picture</h3>
          <input
            className="fileInput"
            type="file"
            ref={inputRef}
            onChange={e => _handleImageChange(e)}
          />

          {!imagePreviewUrl && <div className="preview"></div>}
          {imagePreviewUrl && <img src={imagePreviewUrl} className="preview" />}
          <p className="imageDescription mt-3">
            We recommended an image of at least 300 * 300. Gifs works too. Max
            5mb
          </p>
          <Button
            className="fileButton"
            onClick={() => inputRef.current && inputRef.current.click()}
          >
            Choose file
          </Button>
          <Divider />
          <h3>Change your banner</h3>
          <input
            className="fileInput"
            type="file"
            ref={bannerInputRef}
            onChange={e => _handleBannerChange(e)}
          />

          {!bannerPreviewUrl && <div className="banner_preview"></div>}
          {bannerPreviewUrl && (
            <img src={bannerPreviewUrl} className="banner_preview" />
          )}
          <p className="imageDescription mt-3">
            We recommended an image of at least xxx * xxx.
            <br /> Max 5mb
          </p>
          <Button
            className="fileButton"
            onClick={() =>
              bannerInputRef.current && bannerInputRef.current.click()
            }
          >
            Choose file
          </Button>
        </Col>
      </Row>
    </div>
  );
};
