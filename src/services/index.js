import { apiURL } from '../constants';

export const getContact = async () => {
  let response = await fetch(`${apiURL}/contact`, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw await response.json();
  }

  return await response.json();
};

export const createContact = async (payload) => {
  let response = await fetch(`${apiURL}/contact`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw await response.json();
  }

  return await response.json();
};

export const getDetailContact = async (id) => {
  let response = await fetch(`${apiURL}/contact/${id}`);

  if (!response.ok) {
    throw await response.json();
  }

  return await response.json();
};

export const updateContact = async (id, payload) => {
  let response = await fetch(`${apiURL}/contact/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw await response.json();
  }

  return await response.json();
};

export const deleteContact = async (id) => {
  let response = await fetch(`${apiURL}/contact/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw await response.json();
  }

  return await response.json();
};
