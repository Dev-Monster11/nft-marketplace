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
  const data = await response.json();

  if (response.ok) {
    return data;
  }
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
  const data = await response.json();

  if (response.ok) {
    return data;
  }
};
