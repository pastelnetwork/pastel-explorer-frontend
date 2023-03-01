export const getParameterByName = (name: string, url = window.location.search) => {
  const params = new URLSearchParams(url);
  return params.get(name) || '';
};
