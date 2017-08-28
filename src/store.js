import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fork } from 'redux-saga/effects'
import { reducer as reduxFormReducer } from 'redux-form'
import { createLogger } from 'redux-logger'
import { loginReducer } from './loginReducer'
import { listReducer } from './listReducer'
import loginSaga from './loginSaga'
import listSaga from './listSaga'

const reducers = combineReducers({
    form: reduxFormReducer,
    login: loginReducer,
    list: listReducer
});

function* sagas() {
	yield [
		fork(loginSaga),
		fork(listSaga)
	]
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
				reducers,
				applyMiddleware(sagaMiddleware,createLogger())
			)

sagaMiddleware.run(sagas)

export default store;
