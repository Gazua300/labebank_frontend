import {useState, useEffect} from 'react'
import axios from 'axios'
import {url} from '../../constants/urls'
import {Container} from './styled'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'




//==========================Component=======================
const Home = ()=>{
	const history = useNavigate()
	const [form, setForm] = useState({
		cpf:'',
		password:''
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


	const getBalance = (e)=>{
		e.preventDefault()

		const body = {
			token: localStorage.getItem('token'),
			password: form.password,
			cpf: Number(form.cpf)
		}

		axios.post(`${url}/accounts/balance`, body).then(res=>{
			document.getElementById('result').innerHTML = `${res.data}`
			setForm({
				cpf:'',
				password:''
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

//===============================Renderizaão===========================
	return<div>
		  <Header/>
		  <Container className='content'>
				<h3>Consulta de saldo</h3>
			<form onSubmit={getBalance}>				
				<input name='cpf' value={form.cpf} onChange={onChange}
				 type='number' min='0' placeholder='CPF(somente números)'required/>
				<input name='password' value={form.password} onChange={onChange}
				 type='password' placeholder='Sua senha' autoFocus required/>
				<button>Ver saldo</button>
				<p id='result'></p>
			</form>
		   </Container>
		   <Footer/>
		  </div>
}
export default Home
