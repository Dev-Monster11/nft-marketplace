import React, { useEffect, useState } from 'react';
import { Button, Divider, Row, Col, Layout, Input, Form } from 'antd';
import { MetaplexOverlay, MetaplexModal, ConnectButton } from '@oyster/common';
import { useWallet } from '@solana/wallet-adapter-react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Keypair } from '@solana/web3.js';
import emailjs from '@emailjs/browser';
import * as Bip39 from 'bip39';

const COINBASE =
  'https://www.coinbase.com/learn/tips-and-tutorials/how-to-set-up-a-crypto-wallet';

export const SignInView = () => {
  const { connected, publicKey } = useWallet();
  const history = useHistory();

  console.log('sign in = ', connected, publicKey);
  connected && history.push('/signinconfirm');

  const [showForm, setShowForm] = useState(true);
  const [toEmail, setToEmail] = useState('');
  const [toName, setToName] = useState('');
  const { encode_private_key } = useParams<{ encode_private_key: string }>();
  const { public_key } = useParams<{ public_key: string }>();

  if (encode_private_key && public_key) {
    const decode_private_key = atob(encode_private_key).toString();
    // console.log(public_key);
    const seed = Bip39.mnemonicToSeedSync(decode_private_key).slice(0, 32);
    const importedAccount = Keypair.fromSeed(seed);

    // console.log("seed", importedAccount.publicKey.toString());
    if (public_key == importedAccount.publicKey.toString()) {
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
    const encodeGeneratedMnemonic = btoa(generatedMnemonic);

    // // decode pharse key
    const decodeGeneratedMnemonic = atob(encodeGeneratedMnemonic).toString();
    const inputMnemonic = decodeGeneratedMnemonic.trim().toLowerCase();

    // // seed with the pharse key
    const seed = Bip39.mnemonicToSeedSync(inputMnemonic).slice(0, 32);

    // // get private key and public key from pharse key
    const importedAccount = Keypair.fromSeed(seed);
    // // get public key : importedAccount.publicKey.toString()
    console.log(importedAccount.publicKey.toString(), encodeGeneratedMnemonic);

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
              <h1 className="bold_text title_text">
                Welcome! Let's begin with your wallet.
              </h1>
              <ConnectButton
                className="bold_text"
                type="primary"
                style={{ width: '100%', height: '50px' }}
                allowWalletChange={false}
              />

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
              <Form
                className={
                  !showForm ? 'bold_text visible' : 'bold_text invisible'
                }
                name="create_account"
                onFinish={createAccount}
                autoComplete="off"
                labelCol={{
                  span: 6,
                }}
                wrapperCol={{
                  span: 16,
                }}
              >
                <Form.Item
                  className="my-2"
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username correctly!',
                    },
                  ]}
                >
                  <Input type="text" onChange={setName} />
                </Form.Item>
                <Form.Item
                  className="my-2"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your email correctly!',
                    },
                  ]}
                >
                  <Input type="email" onChange={setEmail} />
                </Form.Item>
                <Divider />
                <Button
                  type="primary"
                  htmlType="submit"
                  className="fw-bold m-2"
                >
                  Create Account
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
    // </MetaplexOverlay>
  );
};
