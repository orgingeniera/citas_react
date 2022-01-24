import {useState, useEffect} from "react";
import Error from './Error'

//props de paciente es cuando vamos a editar
//pacientes es para ir agregando
const Formulario = ({setPacientes, pacientes, paciente, setPaciente}) => {
	//stados creados
	const [nombre, setNombre] = useState('');
	const [propietario, setPropietario] = useState('');
	const [email, setEmail] = useState('');
	const [alta, setAlta] = useState('');
	const [sintomas, setSintomas] = useState('');

	//estado para enviar un error
	const [error, setError] = useState(false)

	//este useEffect se ejecuta cuando presiono el boton editar que llena el obejto de paciente
	useEffect( () => {
		//valido que el objeto este vacio
		if(Object.keys(paciente).length > 0){
			//si el objeto paciente cambia entonces seteamos los campos del formulario con los useState
			setNombre(paciente.nombre)
			setPropietario(paciente.propietario)
			setEmail(paciente.email)
			setAlta(paciente.alta)
			setSintomas(paciente.sintomas)
		}
	}, [paciente])

	//generar el id para los elementos
	const generarId = () => {
		const ramdon = Math.random().toString(36).substr(2)
		const fecha = Date.now().toString(36).substr(2)

		return ramdon + fecha
	}
	//enviar dtos del formulario
	const handelSubmit = (e) => {
		e.preventDefault();
		//validacion del formulario
		if([nombre, propietario,email,alta,sintomas].includes('')){
			setError(true)
			//este return hay que colocarse
			return;
			

		}
		//vuelvo Error a su estado inicial
		setError(false)
		//objeto paciente
		const objetoPaciente = {
			nombre,
			propietario,
			email,
			alta,
			sintomas
			

		}

		if(paciente.id){
			//editando el registro
			objetoPaciente.id = paciente.id
			const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === 
			paciente.id ? objetoPaciente : pacienteState )
			//actualizo
			setPacientes(pacientesActualizados)
			//iniciamos de nuevo el objeto 
			setPaciente({})
		}else{
			//nuevo registro
			//envio los datos de paciente al obejto paciente
			objetoPaciente.id = generarId()
			setPacientes([...pacientes, objetoPaciente])
		}
		//console.log(objetoPaciente)
		//reinicias formulario
		setNombre('')
		setPropietario('')
		setSintomas('')
		setAlta('')
		setEmail('')
	}
// en el boton de enviar paciente.id con este dato valido que exista un paciente y muestro uno u otro text en el boton
	return (
		<div className="md:w-1/2 lg:w-2/5 mx-5">
			<h2 className="font-black text-3xl text-center ">Seguimiento pacientes</h2>
			<p className="text-lg mt-5 text-center mb-10">
				Añade pacientes y {''}
				<span className="text-indigo-600 font-bold">Administralos</span>
			</p>
			<form onSubmit={handelSubmit} className="mx-3 bg-white shadow-md rounded-lg py-3 px-5 mb-16">
				{error && 
					<Error> <p>Todos los campos son obligatorios</p> </Error>
			    }

				<div >
				<label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre mascota</label>
					<input id="mascota" onChange={ (e) => setNombre(e.target.value) } value={nombre} type="text" placeholder="Nombre de la mascota" className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md"/>
				</div>
				<div className="mb-5">
				<label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
				Nombre Propietario
				</label>
					<input id="propietario" onChange={ (e) => setPropietario(e.target.value) } value={propietario} type="text" placeholder="Nombre del propietario" className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md"/>
				</div>
				<div className="mb-5">
				<label htmlFor="email" className="block text-gray-700 uppercase font-bold">
				E-mail
				</label>
					<input id="email" onChange={ (e) => setEmail(e.target.value) } value={email} type="email" placeholder="Correo electronico" className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md"/>
				</div>
				<div className="mb-5">
				<label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
				alta
				</label>
					<input id="alta" onChange={ (e) => setAlta(e.target.value) } value={alta} type="date" className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md"/>
				</div>
				<div className="mb-5">
				<label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
				sintomas
				</label>
					<textarea id="sintomas" onChange={ (e) => setSintomas(e.target.value) } value={sintomas} placeholder="describe los sintomas" className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md"/>
				</div>

				<input value={paciente.id ? "Editar Paciente" : "Agregar Paciente"} type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"/>
			</form>
		</div>
		)
}
export default Formulario