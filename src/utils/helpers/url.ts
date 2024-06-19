import { getBaseURL } from '@utils/constants/statistics';

export const getParameterByName = (name: string, url = window.location.search) => {
  const params = new URLSearchParams(url);
  return params.get(name) || '';
};

export const getSenseImage = (imageUrl: string) => {
  return `${getBaseURL()}/static/sense_images/${imageUrl}`;
};
