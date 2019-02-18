export const getItems = (data) => ({
  type: 'REFRESH',
  data
});

export const getPitches = (data) => ({
  type: 'PITCHES',
  data
});

export const getBasket = (data) => ({
  type: 'BASKET',
  data
});

export const handleLoad = () => ({
  type: 'LOADING',
});

export const googleSignIn = (name, photoUrl) => ({
  type: 'GOOGLESIGNIN',
  name,
  photoUrl,
});

