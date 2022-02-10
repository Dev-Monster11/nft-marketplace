import React, { useEffect, useState, useCallback } from 'react';
import { Button, ButtonProps, Popover, PopoverProps, Divider, Row, Col, Layout, Input, Form, Space } from 'antd';
// import { MetaplexOverlay, MetaplexModal, ConnectButton } from '@oyster/common';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletName } from '@solana/wallet-adapter-base';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Keypair } from '@solana/web3.js';
import emailjs from '@emailjs/browser';
import * as Bip39 from 'bip39';
import { useTheme } from '../../contexts/themecontext';
import { useWalletModal } from '../../contexts/walletProvider';
import bs58 from 'bs58';

const COINBASE =
  'https://www.coinbase.com/learn/tips-and-tutorials/how-to-set-up-a-crypto-wallet';

export const SignInView = () => {
  const { theme, setTheme } = useTheme();
  const { connection } = useConnection();
  const { connected, publicKey, select } = useWallet();
  const history = useHistory();
  

  console.log('sign in = ', connected, publicKey);
  connected && history.push('/signinconfirm');

  const [showForm, setShowForm] = useState(true);
  const [toEmail, setToEmail] = useState('');
  const [toName, setToName] = useState('');
  const { encode_private_key } = useParams<{ encode_private_key: string }>();
  const { public_key } = useParams<{ public_key: string }>();

  if (encode_private_key && public_key) {
    const decode_private_key = bs58.decode(encode_private_key).toString();
    // console.log(public_key);
    const seed = Bip39.mnemonicToSeedSync(decode_private_key).slice(0, 32);
    const importedAccount = Keypair.fromSeed(seed);

    // console.log("seed", importedAccount.publicKey.toString());
    if (public_key == importedAccount.publicKey.toString()) {
      localStorage.setItem("secretkey", encode_private_key);
      select("My Wallet" as WalletName)
      history.push({
        pathname: '/profile',
        state: {
          publicKey: importedAccount.publicKey.toString(),
        },
      });
    }
  }

  const createAccount = () => {
    // const keypair = Keypair.generate();

    // let templateParams = {
    //   message: window.location.origin + "/" + keypair.publicKey.toString() + "/" + keypair.secretKey.toString(),
    //   to_email: toEmail
    // };

    // emailjs.send('service_mlx62oi','template_27qbzyc', templateParams, 'user_BR3tV2tSckwoFJBZjEfRn')
    //   .then(function(response: any) {
    //     console.log('SUCCESS!', response.status);
    //     history.push({
    //       pathname: '/profile',
    //       state: {
    //         public_key: keypair.publicKey.toString(),
    //         private_key: keypair.secretKey.toString()
    //       }
    //     });
    //   }, function(err: any) {
    //     console.log('FAILED...', err);
    //     history.push('/signin');
    //   });

    // create new wallet
    const generatedMnemonic = Bip39.generateMnemonic();

    // encode the wallet private pharse key
    const encodeGeneratedMnemonic = bs58.encode(Buffer.from(generatedMnemonic));

    // // decode pharse key
    const decodeGeneratedMnemonic = bs58.decode(encodeGeneratedMnemonic).toString();
    const inputMnemonic = decodeGeneratedMnemonic.trim().toLowerCase();
    // // seed with the pharse key
    const seed = Bip39.mnemonicToSeedSync(inputMnemonic).slice(0, 32);

    // // get private key and public key from pharse key
    const importedAccount = Keypair.fromSeed(seed);
    // // get public key : importedAccount.publicKey.toString()

    let params = {
      message:
        window.location.origin +
        '#/signin/' +
        importedAccount.publicKey.toString() +
        '/' +
        encodeGeneratedMnemonic,
      to_email: toEmail,
    };

    history.push({
      pathname: '/profile',
      state: {
        publicKey: importedAccount.publicKey.toString(),
      },
    });

    emailjs
      .send(
        'service_mlx62oi',
        'template_27qbzyc',
        params,
        'user_BR3tV2tSckwoFJBZjEfRn',
      )
      .then(
        function (response: any) {
          console.log('SUCCESS!', response.status);
          history.push({
            pathname: '/profile',
            state: {
              publicKey: importedAccount.publicKey.toString(),
            },
          });
        },
        function (err: any) {
          console.log('FAILED...', err);
          history.push('/signin');
        },
      );
  };

  const setEmail = (e: any) => {
    setToEmail(e.target.value);
  };

  const setName = (e: any) => {
    setToName(e.target.value);
  };

  return (
    // <MetaplexOverlay visible centered closable width="100vw">
    <Layout>
      <div style={{ height: '80vh', display: 'flex', position: 'relative' }}>
        <div className="title_container">
          <Row justify="center">
            <Col span={24}>
              <h1 className="bold_text title_text">Welcome! Let's begin.</h1>

              <div className="mt-2">
                <h4 className="fw-bold">Your Queendom Account</h4>
                <h6>
                  This will be your personal Blockchain profile which you will
                  hold your NFTs. Just pick an icon and enter your email. Then
                  you will receive a magic link to that address. Please note
                  this means you do not need a log-in or password.
                </h6>
              </div>
              <div
                className={
                  !showForm ? 'bold_text invisible' : 'bold_text visible'
                }
                style={{ margin: '10px' }}
              >
                <a
                  onClick={() => {
                    setShowForm(false);
                  }}
                >
                  First time setting up a wallet?
                </a>
              </div>
              <Divider />
              <h5 className="text-start fw-bold pb-2">This will be your ...</h5>
              <Form
                className="bold_text"
                name="create_account"
                onFinish={createAccount}
                autoComplete="off"
                wrapperCol={{
                  span: 24,
                }}
              >
                <Form.Item
                  className="my-2"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username correctly!',
                    },
                  ]}
                >
                  <Input
                    className={
                      theme === 'Light'
                        ? 'elements-style input_form_black'
                        : ' elements-style input_form_white'
                    }
                    placeholder="Your Name"
                    type="text"
                    onChange={setName}
                  />
                </Form.Item>
                <Form.Item
                  className="my-3 "
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your email correctly!',
                    },
                  ]}
                >
                  <Input
                    className={
                      theme === 'Light'
                        ? 'elements-style input_form_black'
                        : ' elements-style input_form_white'
                    }
                    placeholder="Your e-mail"
                    type="email"
                    onChange={setEmail}
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  className="fw-bold p-1"
                  style={{ width: '100%' }}
                >
                  Create Account
                </Button>
              </Form>
            </Col>
            <a onClick={() => setShowForm(false)} className="my-2">
              I already have an account
            </a>
            <ConnectButton
              hidden={showForm}
              className="bold_text"
              type="primary"
              style={{ width: '100%', height: '32px' }}
              allowWalletChange={false}
            />
          </Row>
        </div>
      </div>
    </Layout>
    // </MetaplexOverlay>
  );
};

export interface ConnectButtonProps
  extends ButtonProps,
    React.RefAttributes<HTMLElement> {
  popoverPlacement?: PopoverProps['placement'];
  allowWalletChange?: boolean;
}

export const ConnectButton = ({
  onClick,
  children,
  disabled,
  allowWalletChange,
  popoverPlacement,
  ...rest
}: ConnectButtonProps) => {
  const { wallet, connect, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const open = useCallback(() => setVisible(true), [setVisible]);

  const handleClick = useCallback(
    () => (wallet ? connect().catch(() => {}) : open()),
    [wallet, connect, open],
  );

  // only show if wallet selected or user connected

  if (!wallet || !allowWalletChange) {
    return (
      <Button
        {...rest}
        onClick={e => {
          onClick && onClick(e);
          handleClick();
          localStorage.setItem('click-signin', 'yes')
        }}
        disabled={connected && disabled}
      >
        {connected ? children : 'Select A Wallet'}
      </Button>
    );
  }

  return (
    <Popover
      trigger="click"
      placement={popoverPlacement}
      content={
        <Space direction="vertical">
          <Button onClick={open}>Change wallet</Button>
        </Space>
      }
    >
      <Button {...rest} onClick={handleClick} disabled={connected && disabled}>
        Connect
      </Button>
    </Popover>
  );
};
