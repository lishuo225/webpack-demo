import { takeEvery } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'
import Cookies from 'universal-cookie'
import * as actions from './listAction'
import * as api from './api'

function* fetchList(action) {
	try {
		const result = yield call(api.list, action.payload)
		if (Object.keys(result).length) {
			yield put(actions.getlistSuccessed(result))
		} else {
			yield put(actions.getlistFailer('no data'))
		}
	} catch(e) {
		yield put(actions.getlistFailer(e.message))
	}
}

export default function* loginSaga(){
	yield fork(takeEvery, 'LIST_REQUESTED', fetchList)
}