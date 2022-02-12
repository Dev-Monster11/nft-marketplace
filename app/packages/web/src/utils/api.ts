const serverHost = 'http://localhost:8080/api';

export const createUser = async (
  name: string,
  email: string,
  address: string,
) => {
  const rawResponse = await fetch(`${serverHost}/users/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: name, email: email, walletAddress: address }),
  });
  return rawResponse.ok;
};

export const findOneUser = async (address: string) => {
  const response = await fetch(`${serverHost}/users/bywallet/${address}`);

  if (response.ok) {
    try {
      const data = await response.json();
      return data;
    } catch (e) {
      console.log('rege error', e);
      return null;
    }
  }
  return null;
};

export const updateUserImage = async (address: string, image: string) => {
  const rawResponse = await fetch(`${serverHost}/users/updateImage`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image: image, walletAddress: address }),
  });
  return rawResponse.ok;
};

export const getRegisteration = async (email: string) => {
  const response = await fetch(`${serverHost}/registeration/${email}`);
  console.log('rege email = ', response);

  if (response.ok) {
    try {
      const data = await response.json();
      return data;
    } catch (e) {
      console.log('rege error', e);
      return null;
    }
  }
  return null;
};

export const uploadImage = async (file: any, address: string) => {
  const formData = new FormData();
  formData.append('file', file);

  const options = {
    method: 'POST',
    body: formData,
  };

  const rawResponse = await fetch(`${serverHost}/users/upload`, options);

  if (rawResponse.ok) {
    const data = await rawResponse.json();
    const avatar = data.path;
    const avatarRes = await fetch(`${serverHost}/users/udpateAvatar`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ avatar: avatar, walletAddress: address }),
    });
    console.log('save avatar = ', avatarRes);
  }
};
