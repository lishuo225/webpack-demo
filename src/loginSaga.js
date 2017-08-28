import { takeEvery } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'
import Cookies from 'universal-cookie'
import * as api from './api'
import * as actions from './loginAction'

function* fetchLogin(action) {
   //console.warn(action.payload)
   try {
      const result = yield call(api.oauth, action.payload);
      if (result.statusCode && result.statusCode !== 200) {
      	yield put(actions.loginFailer(result))
      }else {
      	yield put(actions.loginSuccess(result));
      }
   } catch (e) {
      yield put(actions.loginFailer(e.message));
   }
}

function* oauthSucceeded(action) {
   const cookies = new Cookies();
   cookies.set('dae_token', action.payload.access_token, { 
      path: '/',
      expires: new Date(Date.now() + ((+action.payload.expires_in) * 1000)) 
   })
   cookies.set('dae_rtoken', action.payload.refresh_token, {
      path: '/',
      expires: new Date(Date.now() + ((+action.payload.expires_in) * 1000))
   })
   yield console.log(cookies.get('dae_token'))
}

export default function* loginSaga(){
	yield fork(takeEvery, 'LOGIN_REQUESTED', fetchLogin)
   yield fork(takeEvery, 'LOGIN_FETCH_SUCCEEDED', oauthSucceeded)
}