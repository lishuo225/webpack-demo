export const loginRequested = (payload) => ({
	type: 'LOGIN_REQUESTED',
	payload
})

export const loginSuccess = (payload) => ({
	type: 'LOGIN_FETCH_SUCCEEDED',
	payload
})

export const loginFailer = (payload) => ({
	type: 'LOGIN_FETCH_FAILED',
	payload
})