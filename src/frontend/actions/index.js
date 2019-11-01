import axios from 'axios'

export const setFavorite = payload => ({
  type: 'SET_FAVORITE',
  payload
})

export const deleteFavorite = payload => ({
  type: 'DELETE_FAVORITE',
  payload
})

export const loginRequest = payload => ({
  type: 'LOGIN_REQUEST',
  payload
})

export const logoutRequest = payload => ({
  type: 'LOGOUT_REQUEST',
  payload
})

export const registerRequest = payload => ({
  type: 'REGISTER_REQUEST',
  payload
})

export const getVideoSource = payload => ({
  type: 'SET_ERROR',
  payload
})

export const setError = payload => ({
  type: 'GET_VIDEO_SOURCE',
  payload
})

export const registerUser = (payload, redirecUrl) => {
  return (dispatch) => {
    axios.post('/auth/sign-up', payload)
      .then(({ data }) => dispatch(registerRequest(data)))
      .then(() => {
        window.location.href = redirecUrl
      })
      .catch((error) => dispatch(setError(error)))
  }
}

export const loginUser = ({email, password}, redirecUrl) => {
  return (dispatch) => {
    axios({
      url: '/auth/sign-in',
      method: 'post',
      auth: {
        username: email,
        password
      }
    })
      .then(({ data }) => {
        console.log('actions - cookies')
        document.cookie = `email=${data.email}`
        document.cookie = `name=${data.name}`
        document.cookie = `id=${data.id}`
        dispatch(loginRequest(data))
      })
      .then(() => {
        window.location.href = redirecUrl
      })
      .catch((error) => dispatch(setError(`Eeeerror: ${error}`)))
  }
}