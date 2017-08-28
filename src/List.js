import React ,{ Component }from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { IntlProvider, FormattedNumber, FormattedDate, FormattedTime } from 'react-intl'
import * as listAction from './listAction'
import CNYIcon from './resources/icons/CNYIcon'
import BTCIcon from './resources/icons/BTCIcon'
import ETHIcon from './resources/icons/ETHIcon'
import ETCIcon from './resources/icons/ETCIcon'
import './list.css'

@connect(
	state => ({
		list: state.list
	}),
	dispatch => ({
		actions: bindActionCreators(listAction, dispatch)
	})
)

export default class List extends React.Component {
	componentDidMount() {
		this.props.actions.listRequest()
	}

	render() {
		const { list } = this.props
		return (
			<IntlProvider>
				<div className='walletList'>
					<header>
						<span>币种</span>
						<span>资产</span>
						<span>最近交易时间</span>
					</header>
					<div className='wallet'>
						<span>
						    <span className='type'><BTCIcon />BTC钱包</span>
						</span>
						<span>{list.data.BTC ? <FormattedNumber value={list.data.BTC.cash} />: '--'}</span>
						<span>{list.data.BTC && list.data.BTC.timestamp ? <FormattedDate value={list.data.BTC.timestamp} year='numeric' month='long' day='2-digit' /> : '--' }</span>
					</div>
					<div className='wallet'>
						<span>
							<span className='type'><CNYIcon />CNY钱包</span>
						</span>
						<span>{list.data.CNY ? <FormattedNumber value={list.data.CNY.cash} />: '--'}</span>
						<span>{list.data.CNY && list.data.CNY.timestamp ? <FormattedDate value={list.data.CNY.timestamp} year='numeric' month='long' day='2-digit' /> : '--' }</span>
					</div>
					<div className='wallet'>
						<span>
							<span className='type'><ETHIcon />ETH钱包</span>
						</span>
						<span>{list.data.ETH ? <FormattedNumber value={list.data.ETH.cash} />: '--'}</span>
						<span>{list.data.ETH && list.data.CNY.timestamp ? <FormattedDate value={list.data.ETH.timestamp} year='numeric' month='long' day='2-digit' /> : '--' }</span>
					</div>
					<div className='wallet'>
						<span>
							<span className='type'><ETCIcon />ETC钱包</span>
						</span>
						<span>{list.data.ETC ? <FormattedNumber value={list.data.ETC.cash} />: '--'}</span>
						<span>{list.data.ETC && list.data.CNY.timestamp ? <FormattedDate value={list.data.ETC.timestamp} year='numeric' month='long' day='2-digit' /> : '--' }</span>
					</div>
				</div>
			</IntlProvider>
		)
	}
}