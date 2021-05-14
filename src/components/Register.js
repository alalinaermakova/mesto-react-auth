import React from 'react';


function Register(props) {

const { onSignUp } = props;

const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');

function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

function handleChangePassword(e) {
    setPassword(e.target.value)
  }

function handleSubmit(e) {
    e.preventDefault();
    onSignUp({
        password,
        email
      })
}



  return (
    <main className="content">
        <div className="register">
            <form className="register__form" noValidate onSubmit={handleSubmit}>
                <h2 className="register__form-title">Регистрация</h2>
                <input className="register__form_input"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={handleChangeEmail}>
                </input>
                <span></span>
                <input className="register__form_input"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Пароль"
                        required
                        value={password}
                        onChange={handleChangePassword}>
                </input>
                <span></span>
                <button type="submit" className="register__button" >Зарегистрироваться</button>
                <a className="register__bottom-link" href='/login'>Уже зарегистрированы? Войти</a>
            </form>
        </div>
    </main>
  )
}

export default Register;
