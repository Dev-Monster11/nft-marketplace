// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   Button,
//   ButtonProps,
//   Popover,
//   PopoverProps,
//   Divider,
//   Row,
//   Col,
//   Layout,
//   Input,
//   Form,
//   Space,
// } from 'antd';
// // import { MetaplexOverlay, MetaplexModal, ConnectButton } from '@oyster/common';
// import { useConnection, useWallet } from '@solana/wallet-adapter-react';
// import { WalletName } from '@solana/wallet-adapter-base';
// import { Link, useHistory, useParams } from 'react-router-dom';
// import { Keypair } from '@solana/web3.js';
// import emailjs from '@emailjs/browser';
// import * as Bip39 from 'bip39';
// import { useTheme } from '../../contexts/themecontext';
// import { useWalletModal } from '../../contexts/walletProvider';
// import bs58 from 'bs58';
// import { MetaplexModal, MetaplexOverlay } from '@oyster/common';
// import { createUser } from '../../utils/api';

// const COINBASE =
//   'https://www.coinbase.com/learn/tips-and-tutorials/how-to-set-up-a-crypto-wallet';

// export const SignInView = () => {
//   localStorage.removeItem('publickey')
//   localStorage.removeItem('registeration')

//   const [showPopup, setsShowPopup] = useState<boolean>(false);
//   console.log(showPopup);

//   useEffect(() => {
//     const myTimer = setTimeout(() => {
//       setsShowPopup(true);
//     }, 2000);
//     return () => clearTimeout(myTimer);
//   }, []);
//   const { theme, setTheme } = useTheme();
//   const { connection } = useConnection();
//   const { connected, publicKey, select } = useWallet();
//   const history = useHistory();

//   // console.log('sign in = ', connected, publicKey);
//   // connected && history.push('/signinconfirm');
//   function delay(time: any) {
//     return new Promise(resolve => setTimeout(resolve, time));
//   }

//   if (connected)  {
//     delay(1000).then(() => history.push('/profile'));
//   }

//   const [showForm, setShowForm] = useState(true);
//   const [toEmail, setToEmail] = useState('');
//   const [toName, setToName] = useState('');
//   const { encode_private_key } = useParams<{ encode_private_key: string }>();
//   const { public_key } = useParams<{ public_key: string }>();
//   const [form] = Form.useForm();

//   if (encode_private_key && public_key) {
//     const decode_private_key = bs58.decode(encode_private_key).toString();
//     // console.log(public_key);
//     const seed = Bip39.mnemonicToSeedSync(decode_private_key).slice(0, 32);
//     const importedAccount = Keypair.fromSeed(seed);

//     // console.log("seed", importedAccount.publicKey.toString());
//     if (public_key == importedAccount.publicKey.toString()) {
//       localStorage.setItem('secretkey', encode_private_key);
//       select('My Wallet' as WalletName);
//       history.push({
//         pathname: '/profile',
//         state: {
//           publicKey: importedAccount.publicKey.toString(),
//         },
//       });
//     }
//   }

//   const createAccount = async () => {
//     // const keypair = Keypair.generate();

//     // let templateParams = {
//     //   message: window.location.origin + "/" + keypair.publicKey.toString() + "/" + keypair.secretKey.toString(),
//     //   to_email: toEmail
//     // };

//     // emailjs.send('service_mlx62oi','template_27qbzyc', templateParams, 'user_BR3tV2tSckwoFJBZjEfRn')
//     //   .then(function(response: any) {
//     //     console.log('SUCCESS!', response.status);
//     //     history.push({
//     //       pathname: '/profile',
//     //       state: {
//     //         public_key: keypair.publicKey.toString(),
//     //         private_key: keypair.secretKey.toString()
//     //       }
//     //     });
//     //   }, function(err: any) {
//     //     console.log('FAILED...', err);
//     //     history.push('/signin');
//     //   });

//     // create new wallet
//     const generatedMnemonic = Bip39.generateMnemonic();

//     // encode the wallet private pharse key
//     const encodeGeneratedMnemonic = bs58.encode(Buffer.from(generatedMnemonic));

//     // // decode pharse key
//     const decodeGeneratedMnemonic = bs58
//       .decode(encodeGeneratedMnemonic)
//       .toString();
//     const inputMnemonic = decodeGeneratedMnemonic.trim().toLowerCase();
//     // // seed with the pharse key
//     const seed = Bip39.mnemonicToSeedSync(inputMnemonic).slice(0, 32);

//     // // get private key and public key from pharse key
//     const importedAccount = Keypair.fromSeed(seed);
//     // // get public key : importedAccount.publicKey.toString()

//     let params = {
//       message:
//         window.location.origin +
//         '#/signin/' +
//         importedAccount.publicKey.toString() +
//         '/' +
//         encodeGeneratedMnemonic,
//       to_email: toEmail,
//     };

//     history.push({
//       pathname: '/profile',
//       state: {
//         publicKey: importedAccount.publicKey.toString(),
//       },
//     });

//     emailjs
//       .send(
//         'service_mlx62oi',
//         'template_27qbzyc',
//         params,
//         'user_BR3tV2tSckwoFJBZjEfRn',
//       )
//       .then(
//         async function (response: any) {
//           console.log('SUCCESS!', response.status);
//           const createResult = await createUser(
//             toName,
//             toEmail,
//             importedAccount.publicKey.toString(),
//           );

//           if (createResult) {
//             localStorage.setItem('publickey', importedAccount.publicKey.toString());
//             history.push({
//               pathname: '/profile',
//               state: {
//                 publicKey: importedAccount.publicKey.toString(),
//               },
//             });
//           }
//         },
//         function (err: any) {
//           console.log('FAILED...', err);
//           history.push('/signin');
//         },
//       );
//   };

//   const setEmail = (e: any) => {
//     setToEmail(e.target.value);
//   };

//   const setName = (e: any) => {
//     setToName(e.target.value);
//   };

//   return (
//     // <MetaplexOverlay visible centered closable width="100vw">
//     <Layout>
//       {/* <MetaplexOverlay
//         width={800}
//         centered
//         visible={showPopup}
//         closable={false}
//       >
//         <div className="signin_popup">
//           <h5 className="fw-normal">Hi, please read carefully!</h5>
//           <h5 className="fw-normal">
//             To enter, make sure to register via
//             <a
//               href=" https://www.eventbrite.com/e/metaverse-fashion-show-and-immersive-
//             nft-fashion-experience-tickets-251415920787?ref=eios"
//             >
//               {' '}
//               https://www.eventbrite.com/e/metaverse-fashion-show-and-immersive-
//               nft-fashion-experience-tickets-251415920787?ref=eios
//             </a>
//           </h5>
//           <h5 className="fw-normal">
//             Please note that you will be able to access the event only during
//             the time that you have registered for, but can access our
//             marketplace anytime after the event to browse and purchase more
//             items.
//           </h5>
//           <h5 className="fw-normal">
//             We highly recommend using a{' '}
//             <span className="fw-bold">desktop browser</span> to access the
//             event.
//           </h5>
//           <h5 className="fw-normal">
//             During the event, as with any other service over the internet, you
//             may get disconnected; in that case, please try to log back in during
//             the session you registered for.
//           </h5>
//           <h5 className="fw-normal">
//             If you have any other questions or need support, email us at
//             <a href="mailto:support@queendom.io" className="fw-bold">
//               {' '}
//               support@queendom.io
//             </a>{' '}
//             or <span className="fw-bold">live chat</span> with us at{' '}
//             <a href="https://www.queendom.io" className="fw-bold">
//               www.queendom.io
//             </a>
//             .
//           </h5>
//           <h5 className="fw-normal">
//             Last but not least, we are a bootstrapped mighty team of 3 aiming to
//             give you the best experience we can. Please be{' '}
//             <span className="fw-bold">patient</span> with us as this is our very
//             first event, but beginning of the great journey of empowering
//             underrepresented communities in the future of the internet.
//           </h5>
//           <Button
//             onClick={() => setsShowPopup(false)}
//             type="primary"
//             className="m-auto my-2"
//           >
//             I Understand
//           </Button>
//         </div>
//       </MetaplexOverlay> */}
//       <div style={{ height: '80vh', position: 'relative' }}>
//         <div className="title_container">
//           <Row justify="center" style={{ width: '100%' }}>
//             <Col span={24}>
//               {/* <h5 className="text-start fw-bold pb-2">This will be your ...</h5> */}

//               <h1 className="fw-bold title_text">WELCOME!</h1>

//               <div className="mt-2">
//                 <h3 className="fw-bold mb-5">Let's Create an Account</h3>
//                 <Form
//                   className="fw-bold"
//                   name="create_account"
//                   onFinish={createAccount}
//                   autoComplete="off"
//                   wrapperCol={{
//                     span: 24,
//                   }}
//                   form={form}
//                 >
//                   <Form.Item
//                     className="my-2"
//                     name="username"
//                     rules={[
//                       {
//                         required: true,
//                         message: 'Enter Name',
//                       },
//                     ]}
//                   >
//                     <Input
//                       className={`${
//                         theme === 'Light'
//                           ? 'elements-style input_form_black'
//                           : ' elements-style input_form_white'
//                       } signin-input`}
//                       placeholder="Name"
//                       type="text"
//                       onChange={setName}
//                     />
//                   </Form.Item>
//                   <Form.Item
//                     className="my-3 "
//                     name="email"
//                     rules={[
//                       {
//                         type: 'email',
//                         message: 'Enter Email',
//                       },
//                       {
//                         required: true,
//                         message: 'Enter Email',
//                       },
//                     ]}
//                   >
//                     <Input
//                       className={`${
//                         theme === 'Light'
//                           ? 'elements-style input_form_black'
//                           : ' elements-style input_form_white'
//                       } signin-input`}
//                       placeholder="Email"
//                       type="email"
//                       onChange={setEmail}
//                     />
//                   </Form.Item>

//                   <Button
//                     type="primary"
//                     htmlType="submit"
//                     className="fw-bold p-1 mb-2"
//                     style={{ width: '100%', height: '40px' }}
//                   >
//                     Create a Solana Wallet
//                   </Button>
//                 </Form>
//                 {/* <a
//                   onClick={() => form.validateFields()}
//                   className="text-decoration-underline"
//                 >
//                   Already have a solana wallet? Connect your wallet.--------
//                 </a> */}
//                 <ConnectButton
//                   hidden={showForm}
//                   className="fw-bold"
//                   type="primary"
//                   style={{ width: '100%', height: '32px' }}
//                   allowWalletChange={false}
//                   formInstance={form}
//                 />
//               </div>
//               <div
//                 className={!showForm ? 'fw-bold invisible' : 'fw-bold visible'}
//                 style={{ margin: '10px' }}
//               >
//                 {/* <a
//                   onClick={() => {
//                     setShowForm(false);
//                   }}
//                 >
//                   First time setting up a wallet?
//                 </a> */}
//               </div>
//             </Col>
//           </Row>
//         </div>
//         <h6 className="fw-bold mt-3 text-center">
//           Your account in this web3 platform is created via a cryptocurrency
//           wallet.
//           <br />
//           Queendom™ is built on Solana blockchain, one of the most
//           environmentally-friendly chains.
//           <br />
//           No worries if you don't have a Solana wallet, we will help you create
//           one in one click!
//         </h6>
//       </div>
//     </Layout>
//     // </MetaplexOverlay>
//   );
// };

// export interface ConnectButtonProps
//   extends ButtonProps,
//     React.RefAttributes<HTMLElement> {
//   popoverPlacement?: PopoverProps['placement'];
//   allowWalletChange?: boolean;
//   formInstance: any;
// }

// export const ConnectButton = ({
//   onClick,
//   children,
//   disabled,
//   allowWalletChange,
//   popoverPlacement,
//   formInstance,
//   ...rest
// }: ConnectButtonProps) => {
//   const { wallet, connect, connected } = useWallet();
//   const { setVisible } = useWalletModal();
//   const open = useCallback(() => setVisible(true), [setVisible]);

//   const handleClick = useCallback(
//     () => (wallet ? connect().catch(() => {}) : open()),
//     [wallet, connect, open],
//   );

//   // only show if wallet selected or user connected

//   if (!wallet || !allowWalletChange) {
//     return (
//       <a
//         onClick={e => {
//           formInstance.validateFields().then((values: any) => {
//             localStorage.setItem('name', values.username)
//             localStorage.setItem('email', values.email)
//             localStorage.setItem('click-signin', 'yes');
//             onClick && onClick(e);
//             handleClick();
//             localStorage.setItem('click-signin', 'yes');
//           });
//         }}
//         style={{ textDecoration: 'underline' }}
//       >
//         {/* {connected ? children : 'Select A Wallet'} */}
//         {/* Already have a solana wallet? Connect your wallet. */}
//         Already have a solana wallet? Connect.
//       </a>
//     );
//   }

//   return (
//     <Popover
//       trigger="click"
//       placement={popoverPlacement}
//       content={
//         <Space direction="vertical">
//           <Button onClick={open}>Change wallet</Button>
//         </Space>
//       }
//     >
//       <Button {...rest} onClick={handleClick} disabled={connected && disabled}>
//         Connect
//       </Button>
//     </Popover>
//   );
// };
import React, { useEffect, useState, useCallback } from 'react';
import {
  Button,
  ButtonProps,
  Popover,
  PopoverProps,
  Divider,
  Row,
  Col,
  Layout,
  Input,
  Form,
  Space,
} from 'antd';
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
import { MetaplexModal, MetaplexOverlay } from '@oyster/common';

const COINBASE =
  'https://www.coinbase.com/learn/tips-and-tutorials/how-to-set-up-a-crypto-wallet';

export const SignInView = () => {
  const [showPopup, setsShowPopup] = useState<boolean>(false);
  console.log(showPopup);

  useEffect(() => {
    const myTimer = setTimeout(() => {
      setsShowPopup(true);
    }, 2000);
    return () => clearTimeout(myTimer);
  }, []);
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
      localStorage.setItem('secretkey', encode_private_key);
      select('My Wallet' as WalletName);
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
    const decodeGeneratedMnemonic = bs58
      .decode(encodeGeneratedMnemonic)
      .toString();
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
      <MetaplexOverlay
        width={800}
        centered
        visible={showPopup}
        closable={false}
      >
        <div className="signin_popup">
          <h5 className="fw-normal">Hi, please read carefully!</h5>
          <h5 className="fw-normal">
            To enter, make sure to register via
            <a
              href=" https://www.eventbrite.com/e/metaverse-fashion-show-and-immersive-
            nft-fashion-experience-tickets-251415920787?ref=eios"
            >
              {' '}
              https://www.eventbrite.com/e/metaverse-fashion-show-and-immersive-
              nft-fashion-experience-tickets-251415920787?ref=eios
            </a>
          </h5>
          <h5 className="fw-normal">
            Please note that you will be able to access the event only during
            the time that you have registered for, but can access our
            marketplace anytime after the event to browse and purchase more
            items.
          </h5>
          <h5 className="fw-normal">
            We highly recommend using a{' '}
            <span className="fw-bold">desktop browser</span> to access the
            event.
          </h5>
          <h5 className="fw-normal">
            During the event, as with any other service over the internet, you
            may get disconnected; in that case, please try to log back in during
            the session you registered for.
          </h5>
          <h5 className="fw-normal">
            If you have any other questions or need support, email us at
            <a href="mailto:support@queendom.io" className="fw-bold">
              {' '}
              support@queendom.io
            </a>{' '}
            or <span className="fw-bold">live chat</span> with us at{' '}
            <a href="https://www.queendom.io" className="fw-bold">
              www.queendom.io
            </a>
            .
          </h5>
          <h5 className="fw-normal">
            Last but not least, we are a bootstrapped mighty team of 3 aiming to
            give you the best experience we can. Please be{' '}
            <span className="fw-bold">patient</span> with us as this is our very
            first event, but beginning of the great journey of empowering
            underrepresented communities in the future of the internet.
          </h5>
          <Button
            onClick={() => setsShowPopup(false)}
            type="primary"
            className="m-auto my-2"
          >
            I Understand
          </Button>
        </div>
      </MetaplexOverlay>
      <div style={{ height: '80vh', position: 'relative' }}>
        <div className="title_container">
          <Row justify="center" style={{ width: '100%' }}>
            <Col span={24}>
              {/* <h5 className="text-start fw-bold pb-2">This will be your ...</h5> */}

              <h1 className="fw-bold title_text">WELCOME!</h1>

              <div className="mt-2">
                <h3 className="fw-bold mb-5">Let's Create an Account</h3>
                <Form
                  className="fw-bold"
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
                        message: 'Enter Name',
                      },
                    ]}
                  >
                    <Input
                      className={`${
                        theme === 'Light'
                          ? 'elements-style input_form_black'
                          : ' elements-style input_form_white'
                      } signin-input`}
                      placeholder="Name"
                      type="text"
                      onChange={setName}
                    />
                  </Form.Item>
                  <Form.Item
                    className="my-3 "
                    name="email"
                    rules={[
                      {
                        type: 'email',
                        message: 'Enter Email',
                      },
                      {
                        required: true,
                        message: 'Enter Email',
                      },
                    ]}
                  >
                    <Input
                      className={`${
                        theme === 'Light'
                          ? 'elements-style input_form_black'
                          : ' elements-style input_form_white'
                      } signin-input`}
                      placeholder="Email"
                      type="email"
                      onChange={setEmail}
                    />
                  </Form.Item>

                  <Button
                    type="primary"
                    htmlType="submit"
                    className="fw-bold p-1 mb-2"
                    style={{ width: '100%', height: '40px' }}
                  >
                    Create a Solana Wallet
                  </Button>
                </Form>
                {/* <a
                  onClick={() => {setShowForm(false)}}
                  className="text-decoration-underline"
                >
                  Already have a solana wallet? Connect your wallet.
                </a> */}
                <ConnectButton
                  hidden={showForm}
                  className="fw-bold"
                  type="primary"
                  style={{ width: '100%', height: '32px' }}
                  allowWalletChange={false}
                />
              </div>
              <div
                className={!showForm ? 'fw-bold invisible' : 'fw-bold visible'}
                style={{ margin: '10px' }}
              >
                {/* <a
                  onClick={() => {
                    setShowForm(false);
                  }}
                >
                  First time setting up a wallet?
                </a> */}
              </div>
            </Col>
          </Row>
        </div>
        <h6 className="fw-bold mt-3 text-center">
          Your account in this web3 platform is created via a cryptocurrency
          wallet.
          <br />
          Queendom™ is built on Solana blockchain, one of the most
          environmentally-friendly chains.
          <br />
          No worries if you don't have a Solana wallet, we will help you create
          one in one click!
        </h6>
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
      <a
        onClick={e => {
          onClick && onClick(e);
          handleClick();
          localStorage.setItem('click-signin', 'yes');
        }}
        style={{ textDecoration: 'underline' }}
      >
        {/* {connected ? children : 'Select A Wallet'} */}
        Already have a solana wallet? Connect your wallet.
      </a>
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
