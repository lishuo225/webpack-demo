const initState = {
	data: {},
	loading: false,
	loaded: false,
  error: null
}

export const loginReducer = (state = initState, action) => {
  switch(action.type){
  	case 'LOGIN_REQUESTED':
  	  return Object.assign({}, state, {loading: true})
	  case 'LOGIN_FETCH_SUCCEEDED':
      return Object.assign({}, state, {data: action.payload, loaded: true});
    case 'LOGIN_FETCH_FAILED':
      return Object.assign({}, state, action.payload);
	default:
	  return state;
  }
};