import {useState, useEffect} from "react";
import Header from './components/Header'
import Formulario from './components/Formulario'
import ListadoPacientes from './components/ListadoPacientes'

function App() {
	//pacientes del formulario
  const [pacientes, setPacientes] = useState([])
  //pacientes para editar
  const [paciente, setPaciente] = useState({})

  useEffect(() => {
  	const obtenerLs = () => {
  		const pacientesLs = JSON.parse(localStorage.getItem('pacientes') ?? [])
  		setPacientes(pacientesLs)
  	}
  	obtenerLs()
  }, [])

  useEffect(() => {
  	localStorage.setItem('pacientes', JSON.stringify( pacientes ))
  }, [pacientes])
  //no es que elimina filtra, trae los que no concidan con la condicion y crea un objeto nuevo
  const eliminarPaciente = (id) => {
  	const pacientesEliminados = pacientes.filter( paciente => paciente.id !== id);
  	setPacientes(pacientesEliminados)
  }
 

  return (
    <div className="container mx-auto mt-20">
      <Header   />
      <div className="mt-12 md:flex">
       <Formulario
         paciente ={paciente}
         pacientes ={pacientes}
       	 setPacientes={setPacientes} 
       	 setPaciente= {setPaciente}
        />
       <ListadoPacientes eliminarPaciente={eliminarPaciente} pacientes={pacientes} setPaciente={setPaciente} />
      </div>

    </div>
  )
}

export default App
