import {useState, useEffect} from 'react'
import {Container, Card} from './styled'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'
import { url } from '../../constants/urls'
import axios from 'axios'
import { convertDate } from '../../utils/ConvertDate'




//==========================Component=======================
const Statement = ()=>{
	const history = useNavigate()
	const [transaction, setTransaction] = useState([])
	const [form, setForm] = useState({
		password:'',
		cpf:''
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


	const statement = (e)=>{
		e.preventDefault()

		const body = {
			token: localStorage.getItem('token'),
			password: form.password,
			cpf: Number(form.cpf)
		}

		axios.post(`${url}/accounts/statement`, body).then(res=>{
			setTransaction(res.data)
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
					<h3>Extrato</h3>
				<form onSubmit={statement}>				
					<input name='cpf' value={form.cpf} onChange={onChange}
					type='number' min='0' placeholder='CPF(somente números)'required/>
					<input name='password' value={form.password} onChange={onChange}
					type='password' placeholder='Sua senha' autoFocus required />
					<button>Consultar</button>
					{transaction && transaction.map(state=>{
						return <Card><b>Valor: </b>{state.value}<br/>
								<b>Data: </b>{convertDate(state.date)}<br/>
								<b>Descrição: </b>{state.description}<hr/>
							</Card>
					})}
				</form>
			</Container>
			<Footer/>
		  </div>
}
export default Statement
