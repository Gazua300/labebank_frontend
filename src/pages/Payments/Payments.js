import {useEffect, useState} from 'react'
import axios from 'axios'
import {url} from '../../constants/urls'
import {Container} from './styled'
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom'


//+=======================Components==========================
const Payments = ()=>{
	const history = useNavigate()
	const [cpf, setCpf] = useState('')
	const [form, setForm] = useState({
		password:'',
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


	const pay = (e)=>{
		e.preventDefault()
		const convert = form.initialDate.split('-')
		const date = `${convert[2]}/${convert[1]}/${convert[0]}`

		const body = {
			token: localStorage.getItem('token'),
			password: form.password,
			cpf: Number(cpf),
			initialDate: date,
			value: form.value,
			description: form.description
		}

		axios({
			method:'POST',
			url:`${url}/accounts/payment`,
			headers: {
				Authorization: localStorage.getItem('token')
			},
			data: body
		}).then(res=>{
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


	const limpar = ()=>{
		setCpf('')
		setForm({
			password:'',
			initialDate:'',
			value:'',
			description:''
		})
	}

//====================================Render=============================
	return<div>
			<Header/>
			 <Container>
				<h3>Pagamentos</h3>
				<form onSubmit={pay}>					
					<input className='form-control'
						type='text'
						maxLength='11'
						name='cpf'
						value={cpf}
						onChange={handleCPF}
					 	placeholder='CPF(somente números)'
						required/>
					<input className='form-control'
						type='date'
						name='initialDate'
						value={form.initialDate}
						onChange={onChange}
						required/>
					<input className='form-control'
						type='text'
						name='description'
						value={form.description}
						onChange={onChange}
					 	placeholder='Descrição'
						required/>
					<input className='form-control'
						type='text'
						name='value'
						value={form.value}
						onChange={onChange}
						placeholder='Valor R$ 0,00' 
						required/>
					<input className='form-control'
						type='password'
						name='password'
						value={form.password}
						onChange={onChange}
					 	placeholder='Sua senha'
						required/>
					<div className='input-container'>
						<input className='btn btn-secondary'
							value='Limpar'
							type='button'
							onClick={limpar}/>
						<button className='btn btn-secondary'>Saldo</button>
					</div>
				</form>
			  </Container>
		  </div>
}
export default Payments
