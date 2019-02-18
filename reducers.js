const stateDef = {
  isLoadingComplete: false,
  url: "192.168.1.182:3000",
  data: [],
  pitches: [],
  basket: [],
  signedIn: false,
  name: "",
  photoUrl: "",
};

export default (state = stateDef, action) => {
  switch(action.type) {
    case 'REFRESH':
   return {...state, data: action.data}
   case 'PITCHES':
   return {...state, pitches: action.data}
   case 'BASKET':
   return {...state, basket: action.data}
    case 'LOADING':
   return {...state, isLoadingComplete: true}
    case 'GOOGLESIGNIN':
    return {...state, 
      signedIn: true,
      name: action.name,
      photoUrl: action.photoUrl}
   default: 
    return state; 
  }
}

