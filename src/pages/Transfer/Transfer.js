import axios from 'axios'
import {useState, useEffect} from 'react'
import {url} from '../../constants/urls'
import {Container} from './styled'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'


//===========================Inicio do compoente funcional=========
const Transfer = ()=>{
	const history = useNavigate()
	const [form, setForm] = useState({
		password:'',
		cpf:'',
		recipientName:'',
		recipientCpf:'',
		value:''
	})

	useEffect(()=>{
		const token = localStorage.getItem('token')

		if(token === null){
			history('/')
		}

	}, [])

	const onChange = (e)=>{
		const {name, value} = e.target
		setForm({...form, [name]: value})
	}


	const transfer = (e)=>{
		e.preventDefault()

		const body = {
			token: localStorage.getItem('token'),
			password: form.password,
			cpf: Number(form.cpf),
			recipientName: form.recipientName,
			recipientCpf: Number(form.recipientCpf),
			value: Number(form.value)
		}

		axios.post(`${url}/accounts/transfer`, body).then(res=>{
			alert(res.data)
			setForm({
				password:'',
				cpf:'',
				recipientName:'',
				recipientCpf:'',
				value:''
			})
		}).catch(err=>{
			const msg = err.response.data.message
			if(msg === 'jwt expired'){
				alert(`Token expirado\nPor motivos de segurança você deve efetuar login novamente`)
			}else{
				alert(err.response.data)
			}
		})

	}


//=============================Render============================
	return<div>
			<Header/>
			 <Container>
				<h3>Transferências</h3>
				<form onSubmit={transfer}>					
					<input type='number' name='cpf' value={form.cpf}
					 onChange={onChange} placeholder='CPF(somente números)' autoFocus required/>
					<input type='text' name='recipientName' value={form.recipientName}
					 onChange={onChange} placeholder='Nome do destinatário' required/>
					<input type='number' name='recipientCpf' value={form.recipientCpf}
					 onChange={onChange} placeholder='CPF do destinatário' required/>
					<input type='number' name='value' value={form.value} onChange={onChange}
					 placeholder='Valor R$ 0,00'required/>
					<input type='password' name='password' value={form.password} onChange={onChange}
					 placeholder='Sua senha' required/>
					<button>Transferir</button>
				</form>
			  </Container>
			  <Footer/>
		   </div>
}
export default Transfer
