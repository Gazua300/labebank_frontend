import {useState, useEffect} from 'react'
import axios from 'axios'
import {url} from '../../constants/urls'
import {Container} from './styled'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'



//===================Inicio do componente funcional==========================
const Deposit = ()=>{
	const history = useNavigate()
	const [form, setForm] = useState({
		password:'',
		cpf:'',
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


	const addCash = (e)=>{
		e.preventDefault()

		const body = {
			token: localStorage.getItem('token'),
			password: form.password,
			cpf: Number(form.cpf),
			value: Number(form.value)
		}

		axios.post(`${url}/accounts/deposit`, body).then(res=>{
			alert(`Seu deposito de R$ ${form.value} foi efetuado com sucesso.`)
			setForm({
				password:'',
				cpf:'',
				value:''
			})
		}).catch(err=>{
			const msg = err.response.data.message
			if(msg === 'jwt expired'){
				alert(`Token expirado\nPor motivos de segurança você deve efetuar login novamente`)
			}else{
				alert(err.response.data.message)
			}
		})

	}


//===========================Render================================

	return<div>
			 <Header/>
			 <Container>
				<h3>Depositos</h3>
				<form onSubmit={addCash}>					
					<input type='number' name='cpf' value={form.cpf} onChange={onChange}
					 placeholder='CPF(somente números)' autoFocus required/>
					<input type='number' name='value' value={form.value} onChange={onChange}
					 placeholder='R$ 0,00' required/>
					<input type='password' name='password' value={form.password} onChange={onChange}
					 placeholder='Sua senha' required/>
					<button>Efetuar</button>
				</form>
			  </Container>
			  <Footer/>
		  </div>
}
export default Deposit
