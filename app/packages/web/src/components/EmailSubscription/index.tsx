import { SendOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row, Col, Popover } from 'antd';
import { useState } from 'react';
// import { footerConf } from './footerData';
import { LABELS } from '../../constants';
import { useTheme, Theme } from '../../contexts/themecontext';

export const EmailSubscription = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const validateMessages = {
    types: {
      email: 'Input is not a valid email!',
    },
  };

  const CustomForm = (props: {
    status?: string;
    message?: string;
    onValidated?: (val: any) => void;
  }) => {
    let email: any;
    const submit = (values: any) => {
      setShowPopup(true);
      email = values.user.email;
      email &&
        email.indexOf('@') > -1 &&
        props.onValidated &&
        props.onValidated({
          EMAIL: email,
          // NAME: name.value
        });
    };
    return (
      <div className="mb-2">
        <Popover
          content={
            <>
              <h5>Thank You for subscribing! We will keep you posted!</h5>
              <Button onClick={() => setShowPopup(false)}>
                <h5>Close</h5>
              </Button>
            </>
          }
          placement="bottom"
          title=""
          trigger="submit"
          visible={showPopup}
        >
          {/* <h4 className="text-center fw-bold">Get the latest Queendom Updates</h4> */}
          <Form onFinish={submit} validateMessages={validateMessages}>
            <div className="d-flex mx-auto subscribe-container justify-content-center">
              <Input
                required
                type="email"
                placeholder="Enter your email to get the latest updates"
                bordered
                className={theme === Theme.Light ? 'inputWhite' : 'inputBlack'}
              />
              <Button
                style={{ height: 'max-content' }}
                htmlType="submit"
                type="primary"
                className="subscribe_button"
              >
                Subscribe
              </Button>
            </div>
          </Form>
        </Popover>
        {props.status ? (
          <div>
            {props.status === 'sending' && <div>Loading...</div>}
            {props.status === 'error' && (
              <div dangerouslySetInnerHTML={{ __html: props.message ?? '' }} />
            )}
            {props.status === 'success' && (
              <div dangerouslySetInnerHTML={{ __html: props.message ?? '' }} />
            )}
          </div>
        ) : null}
      </div>
    );
  };

  const NewsLetterForm = () => (
    // TODO: remove use of deprecated DOM API
    <CustomForm status={status} />
  );

  return <NewsLetterForm />;
};
