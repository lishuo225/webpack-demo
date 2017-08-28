import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import store from './store'
import Login from './Login'
import Header from './Header'
import List from './List'

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Header}>
				<IndexRoute component={Login} />
				<Route path="/login" component={Login} />
				<Route path="/list" component={List} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
)
