import React ,{ Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import './style.css'

@connect(
  state => ({
     loginStatus: state.login
   })
)

export default class Header extends Component {
	render() {
		const { loginStatus , children} = this.props;

		return (
			<div>
				<div className="header-nav">
						<ul>
							<li><Link to="/login">登录</Link></li>
							<li><Link to="/list">列表</Link></li>
						</ul>
					<div className="txt">{loginStatus.data.access_token && <span>登录成功</span>}</div>
				</div>
				{children}
			</div>
		)
	}
}