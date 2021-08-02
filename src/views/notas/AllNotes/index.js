import React from 'react'
import axios from 'axios'
import Moment from 'react-moment'
import Cookies from 'universal-cookie'
import { useState, useEffect } from 'react'
import {
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import { DocsCallout, Example } from 'src/reusable'

function AllPerson() {
  //constante de la endpoint
  const baseUrl = 'https://localhost:44344/api/personas/tutor'
  const baseUrl2 = 'https://localhost:44344/api/notas_parciales/espacio'
  //estado
  const [data, setData] = useState([])
  const [dataNotas, setDataNotas] = useState([])

  const [visible, setVisible] = useState(false)

  const cookies = new Cookies()

  const verMas = async (id) => {
    setVisible(true)
    await axios
      .get(baseUrl2 + `/${id}`)
      .then((response) => {
        console.log(response.data)
        setDataNotas(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const peticionGet = async () => {
    await axios
      .get(baseUrl + `/${cookies.get('nro_documento')}`)
      .then((response) => {
        //console.log(response.data)
        setData(response.data)
        //alert('Hola , ' + response.data)
        //console.log(response.data.personas)
        setVisible(false) //para cerrar la ventana a la hora de cerrar el modal
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    peticionGet()
  }, [])
  return (
    <CTable hover responsive align="middle" className="mb-0 border">
      <CContainer fluid>
        <CRow>
          <CCol xs={12}>
            <CCard>
              <CCardHeader>
                <strong>Perosnas a cargo del Tutor :</strong>{' '}
                <small>
                  {' '}
                  {cookies.get('nombres')} {cookies.get('apellido')} , DNI :{' '}
                  {cookies.get('nro_documento')}{' '}
                </small>
              </CCardHeader>
              <CCardBody>
                {/* <p className="text-medium-emphasis small">
            Use <code>striped</code> property to add zebra-striping to any table row within the{' '}
            <code>&lt;CTableBody&gt;</code>.
          </p> */}
                <CTable striped>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Apellido</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                      <CTableHeaderCell scope="col">D.N.I</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Fecha Nacimiento</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Domicilio</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Calle</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Telefono</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Notas</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {data.map((personas) => (
                      <CTableRow key={personas.idpersona}>
                        <CTableHeaderCell scope="row">{personas.idpersona}</CTableHeaderCell>
                        <CTableDataCell>{personas.apellido}</CTableDataCell>
                        <CTableDataCell>{personas.nombres}</CTableDataCell>
                        <CTableDataCell>{personas.nro_documento}</CTableDataCell>
                        <CTableDataCell>
                          <Moment format="DD/MM/YYYY">{personas.fecha_nacimiento}</Moment>
                        </CTableDataCell>
                        <CTableDataCell>{personas.calle}</CTableDataCell>
                        <CTableDataCell>{personas.telefono}</CTableDataCell>
                        <CTableDataCell>{personas.email}</CTableDataCell>
                        <CTableDataCell></CTableDataCell>

                        {/* <CButton></CButton> */}
                        <CButton
                          onClick={() => {
                            verMas(personas.idpersona)
                          }}
                        >
                          VER
                        </CButton>
                        <CModal visible={visible} onDismiss={() => setVisible(false)}>
                          <CModalHeader onDismiss={() => setVisible(false)}>
                            <CModalTitle>NOTAS</CModalTitle>
                          </CModalHeader>
                          <CModalBody>
                            <CTable hover responsive align="middle" className="mb-0 border">
                              <CTableHead color="light">
                                <CTableRow>
                                  <CTableHeaderCell>Id</CTableHeaderCell>
                                  <CTableHeaderCell>Periodo</CTableHeaderCell>
                                  <CTableHeaderCell>Espacio Curricular</CTableHeaderCell>
                                  <CTableHeaderCell>Nota</CTableHeaderCell>
                                </CTableRow>
                              </CTableHead>
                              <CTableBody>
                                {dataNotas.map((notas) => (
                                  <CTableRow key={notas.idnota_parcial}>
                                    <CTableDataCell>{notas.idnota_parcial}</CTableDataCell>
                                    {/* <CTableDataCell>{notas.nota_instancia}</CTableDataCell> */}
                                    <CTableDataCell>
                                      {notas.notas_instancias.descripcion}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      {notas.ofertas_detalles.espacios_curriculares.descripcion}
                                    </CTableDataCell>
                                    <CTableDataCell>{notas.nota}</CTableDataCell>
                                  </CTableRow>
                                ))}
                              </CTableBody>
                            </CTable>
                          </CModalBody>
                          <CModalFooter>
                            {/* <CButton
                              color="secondary"
                              onClick={() => peticionGet()}
                            >
                              x
                            </CButton> */}

                            {/* <CButton color="primary">Save changes</CButton> */}
                          </CModalFooter>
                        </CModal>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </CTable>
  )
}
export default AllPerson
