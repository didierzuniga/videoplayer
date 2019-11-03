import React, { useState } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../actions'
import { Link } from 'react-router-dom'
import '../assets/styles/components/Register.scss'

const Register = props => {

  const [form, setValues] = useState({
    email: '',
    name: '',
    password: ''
  })

  const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
  }

  const handleInput = event => {
    // if ([event.target.name] == 'email') {
    //   if (validateEmail(event.target.value)) {
    //     console.log('Esta OK')
    //   } else {
    //     console.log('Esta WRONG')
    //   }
    // }
    setValues({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    props.registerUser(form, '/login')
  }

  return (
    <section className="register">
      <section className="register__container">
        <h2>Regístrate</h2>
        <form className="register__container--form" onSubmit={handleSubmit}>
          <input
            name="name"
            className="input"
            type="text"
            placeholder="Nombre"
            onChange={handleInput}
            required
          />
          <input
            name="email"
            className="input"
            type="text"
            placeholder="Correo"
            onChange={handleInput}
            required
          />
          <input
            name="password"
            className="input"
            type="password"
            placeholder="Contraseña"
            onChange={handleInput}
            required
          />
          <button className="button" type="submit">Registrarme</button>
        </form>
        <Link to="/login">
          Iniciar sesión
        </Link>
      </section>
    </section>
  )
}

const mapDispatchToProps = {
  registerUser
}

export default connect(null, mapDispatchToProps)(Register)