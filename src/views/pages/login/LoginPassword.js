import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import axios from 'axios'
import md5 from 'md5'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const baseUrl = 'https://localhost:44344/api/usuarios_app'

//Instanciar las cookies para las variables de sesion
const cookies = new Cookies()

export default class login extends Component {
  //INICIALIZA EL ESTADO
  state = {
    form: {
      username: '',
      password: '',
    },
  }

  //HANDLECHANGE , LEVANTA EL ESTADO Y VA GUARDARDO LO QUE SE INTRUDCE EN CADA INPUT  CON EL ONCHANGE {this.handleChange}
  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    })
    //console.log(this.state.form)
  }

  //FX PARA INCIAR SESION  DE TIPO ASYNC/AWAIT , VA ALA ENDPOINT api/usuarios/username/password y le pega ALA consulta de si son iguales EL USUARIO Y EL PASS QUE ESTAN EN BD
  validarDni = async () => {
    await axios
      .get(baseUrl + `/${this.state.form.username}/${md5(this.state.form.password)}`)
      .then((response) => {
        return response
      })
      .then((response) => {
        console.log(response.status)
        if (response.status == '200') {
          console.log(response.data)

          //var respuesta = response[0]
          //cookies.set('nro_documento', respuesta.personas.nro_documento, { path: '/' })

          console.log(response.data.personas.nro_documento)
          cookies.set('nro_documento', response.data.personas.nro_documento, { path: '/' })
          cookies.set('nombres', response.data.personas.nombres, { path: '/' })
          cookies.set('apellido', response.data.personas.apellido, { path: '/' })
          cookies.set('idpersona', response.data.personas.idpersona, { path: '/' })
          alert(
            'Bienvenido Usuario : ' +
              response.data.username /* response.data.nombres + response.data.apellido +  */,
          )
          //var respuesta = response[0]

          window.location.href = './'
        }
      })
      .catch((error) => {
        alert('El Usuario o Password Ingresado son Incorrectos')
        window.location.href = './loginComplete'
        console.log(error)
      })
  }

  render() {
    return (
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Validacion</h1>
                      <p className="text-medium-emphasis">Ingrese su Usuario y Password</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                        <CFormControl
                          type="text"
                          name="username"
                          placeholder="Usuario"
                          onChange={this.handleChange}
                          autoComplete="documento"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                        <CFormControl
                          type="password"
                          name="password"
                          placeholder="Password"
                          onChange={this.handleChange}
                          autoComplete="current-password"
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton
                            color="primary"
                            onClick={() => this.validarDni()}
                            className="px-4"
                          >
                            Validar
                          </CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p></p>
                      <Link to="/register">
                        <CButton color="primary" className="mt-3" active tabIndex={-1}>
                          Register Now!
                        </CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )
  }
} //fin login
