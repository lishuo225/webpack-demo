import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form/es/immutable'
import * as loginActions from './loginAction'
import './login.css'

const validate = values => {
  const errors = {}
  if(!values.username) {
    errors.username = "请输入邮箱或手机号"
  }
  if(!values.password) {
    errors.password = "请输入密码"
  }
  return errors;
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <span>
    <label>{label} </label>
      <input {...input} placeholder={label} type={type} />
      {touched && (error && <span>{error}</span>)}
  </span>
);

@connect(
  state => ({
     loginStatus: state.login
   }),
  dispatch => ({
    actions: bindActionCreators(loginActions, dispatch)
  })
)

class LoginForm extends Component {
  // componentWillMount() {
  //   const { cookies } = this.props;
  //   console.log(111111)
  //   console.log(cookies)
  // }


  handleSubmitForm = data => {
   // console.warn(data)
     this.props.actions.loginRequested({
      ...data,
      scope: 'ui',
      grant_type: 'password'
     })
  }

  render() {
    const { loginStatus, pristine, submitting ,handleSubmit } = this.props
    const error = loginStatus.error;
    //cookies.set('name', name, { path: '/' });
    //const loading = loginStatus.loading;
    return (
      <div className='container'>
        <h3 className='title'>登录</h3>
        <form className='field' onSubmit={handleSubmit(::this.handleSubmitForm)}>
            <Field name="username" component={renderField} type="text" label="邮箱或电话"/>
            <Field name="password" component={renderField} type="password" label="密码"/>
            <button type="submit" disabled={pristine || submitting} >登录</button>
        </form>
      </div>
    )
  }
};

export default reduxForm({ 
  form: 'LoginForm', 
  validate 
})(LoginForm)



