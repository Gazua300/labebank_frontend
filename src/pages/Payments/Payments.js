import {useEffect, useState} from 'react'
import axios from 'axios'
import {url} from '../../constants/urls'
import {Container} from './styled'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'


//+=======================Components==========================
const Payments = ()=>{
	const history = useNavigate()
	const [form, setForm] = useState({
		password:'',
		cpf:'',
		initialDate:'',
		value:'',
		description:''
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


	const pay = (e)=>{
		e.preventDefault()

		const body = {
			token: localStorage.getItem('token'),
			password: form.password,
			cpf: Number(form.cpf),
			initialDate: form.initialDate,
			value: form.value,
			description: form.description
		}

		axios.post(`${url}/accounts/payment`, body).then(res=>{
			alert('Pagamento efetuado com sucesso!')
			setForm({
				password:'',
				cpf:'',
				initialDate:'',
				value:'',
				description:''
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

//====================================Render=============================
	return<div>
			<Header/>
			 <Container>
				<h3>Pagamentos</h3>
				<form onSubmit={pay}>					
					<input type='number' name='cpf' value={form.cpf} onChange={onChange}
					 placeholder='CPF(somente números)' required/>
					<input type='date' name='initialDate' value={form.initialDate} onChange={onChange}
					 required/>
					<input type='text' name='description' value={form.description} onChange={onChange}
					 placeholder='Descrição' required/>
					<input type='number' name='value' value={form.value} onChange={onChange}
					 placeholder='Valor R$ 0,00' required/>
					<input type='password' name='password' value={form.password} onChange={onChange}
					 placeholder='Sua senha' required/>
					<button>Efetuar pagamento</button>
				</form>
			  </Container>
			  <Footer />
		  </div>
}
export default Payments
