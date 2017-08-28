const initState1 = {
	data: {
		CNY: null,
		BTC: null,
		ETH: null,
		ETC: null
	},
	loading: false,
	loaded: false,
    error: null
}

export const listReducer = (state=initState1, action) => {
	switch (action.type) {
		case 'LIST_REQUESTED':
			return Object.assign({}, state, { loading: true })
		case 'LIST_FETCH_SUCCESSED':
			return Object.assign({}, state, { loading: false, loaded: true, data: action.payload })
		case 'LIST_FETCH_FAILED':
			return Object.assign({}, state, { loading: false, error: action.payload })
		default:
			return state
	}
}