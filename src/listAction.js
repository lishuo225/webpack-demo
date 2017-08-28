export const listRequest = (payload) => ({
	type: 'LIST_REQUESTED',
	payload
})

export const getlistSuccessed = (payload) => ({
	type: 'LIST_FETCH_SUCCESSED',
	payload
})

export const getlistFailer = (payload) => ({
	type: 'LIST_FETCH_FAILED',
	payload
})