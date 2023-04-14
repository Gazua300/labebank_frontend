import {useState, useEffect} from 'react'
import axios from 'axios'
import {url} from '../../constants/urls'
import {Container} from './styled'
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom'



//===================Inicio do componente funcional==========================
const Deposit = ()=>{
	const history = useNavigate()
	const [cpf, setCpf] = useState('')
	const [value, setValue] = useState('')
	const [form, setForm] = useState({
		password:'',
	})


	const handleCPF = (e)=>{
        const inputValue = e.target.value
    
        if(!isNaN(inputValue)){
            setCpf(inputValue)
        }
    }

	const handleValue = (e)=>{
        const inputValue = e.target.value
    
        if(!isNaN(inputValue)){
            setValue(inputValue)
        }
    }


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
			cpf: Number(cpf),
			value: Number(value)
		}

		axios({
			method:'POST',
			url:`${url}/accounts/deposit`,
			headers: {
				Authorization: localStorage.getItem('token')
			},
			data: body
		}).then((res)=>{
			alert(res.data)
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


	const limpar = ()=>{
		setCpf('')
		setValue('')
		setForm({
			password:''
		})
	}


//===========================Render================================

	return<div>
			 <Header/>
			 <Container>
				<h3>Depositos</h3>
				<form onSubmit={addCash}>					
					<input className='form-control' maxLength='11' 
						type='text' name='cpf' value={cpf} onChange={handleCPF}
					 placeholder='CPF(somente números)' autoFocus required/>
					<input className='form-control' 
						type='text' name='value' value={value} onChange={handleValue}
					 placeholder='R$ 0,00' required/>
					<input className='form-control' 
						type='password' name='password' value={form.password} onChange={onChange}
					 placeholder='Sua senha' required/>
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
export default Deposit
