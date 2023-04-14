import {useState, useEffect} from 'react'
import axios from 'axios'
import {url} from '../../constants/urls'
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom'
import { Container } from './styled'




//==========================Component=======================
const Balance = ()=>{
	const history = useNavigate()
	const [cpf, setCpf] = useState('')
	const [form, setForm] = useState({
		password:''
	})



	useEffect(()=>{
		const token = localStorage.getItem('token')

		if(token === null){
			history('/')
		}

	}, [])


	const handleCPF = (e)=>{
        const inputValue = e.target.value
    
        if(!isNaN(inputValue)){
            setCpf(inputValue)
        }
    }


	const onChange = (e)=>{
		const {name, value} = e.target
		setForm({...form, [name]: value})
	}


	const getBalance = (e)=>{
		e.preventDefault()

		const body = {
			password: form.password,
			cpf: Number(cpf)
		}

		axios({
			method:'POST',
			url:`${url}/accounts/balance`,
			headers: {
				Authorization: localStorage.getItem('token')
			},
			data: body
		}).then(res=>{
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


	const limpar = ()=>{
		setForm({
			cpf:'',
			password:''
		})
	}

//===============================Renderizaão===========================
	return<div>
		  <Header/>
		  <Container className='content'>
				<h3>Consulta de saldo</h3>
			<form onSubmit={getBalance}>				
				<input className='form-control' 
					name='cpf'
					value={cpf}
					onChange={handleCPF}
				 	type='text'
					maxLength='11'
					placeholder='CPF(somente números)'
					required/>
				<input className='form-control' 
					name='password' value={form.password} onChange={onChange}
				 type='password' placeholder='Sua senha' autoFocus required/>
				<div className='input-container'>
					<input className='btn btn-secondary'
						value='Limpar'
						type='button'
						onClick={limpar}/>
					<button className='btn btn-secondary'>Saldo</button>
				</div>
				<p id='result'></p>
			</form>
		   </Container>		   
		  </div>
}
export default Balance
