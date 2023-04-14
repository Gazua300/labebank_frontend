import axios from 'axios'
import {useState, useEffect} from 'react'
import {url} from '../../constants/urls'
import {Container} from './styled'
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom'


//===========================Inicio do compoente funcional=========
const Transfer = ()=>{
	const history = useNavigate()
	const [cpf, setCpf] = useState('')
	const [recipientCpf, setRecipientCpf] = useState('')
	const [value, setValue] = useState('')
	const [form, setForm] = useState({
		password:'',
		recipientName:'',
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

	const handleRecipientCpf = (e)=>{
        const inputValue = e.target.value
    
        if(!isNaN(inputValue)){
            setRecipientCpf(inputValue)
        }
    }

	const handleValue = (e)=>{
        const inputValue = e.target.value
    
        if(!isNaN(inputValue)){
            setValue(inputValue)
        }
    }


	const onChange = (e)=>{
		const {name, value} = e.target
		setForm({...form, [name]: value})
	}


	const transfer = (e)=>{
		e.preventDefault()

		const body = {
			token: localStorage.getItem('token'),
			password: form.password,
			cpf: Number(cpf),
			recipientName: form.recipientName,
			recipientCpf: Number(recipientCpf),
			value: Number(value)
		}

		axios({
			method:'POST',
			url:`${url}/accounts/transfer`,
			headers: {
				Authorization: localStorage.getItem('token')
			},
			data: body
		}).then(res=>{
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


	const limpar = ()=>{
		setCpf('')
		setRecipientCpf('')
		setValue('')
		setForm({
			password:'',
			recipientName:''
		})
	}


//=============================Render============================
	return<div>
			<Header/>
			 <Container>
				<h3>Transferências</h3>
				<form onSubmit={transfer}>					
					<input className='form-control' maxLength='11' 
						type='text' name='cpf' value={cpf}
					 onChange={handleCPF} placeholder='CPF(somente números)' autoFocus required/>
					<input className='form-control'
						type='text' name='recipientName' value={form.recipientName}
					 onChange={onChange} placeholder='Nome do destinatário' required/>
					<input className='form-control' maxLength='11'
						type='text' name='recipientCpf' value={recipientCpf}
					 onChange={handleRecipientCpf} placeholder='CPF do destinatário' required/>
					<input className='form-control' 
						type='text' name='value' value={value} onChange={handleValue}
					 placeholder='Valor R$ 0,00'required/>
					<input className='form-control'
						type='password' name='password' value={form.password} onChange={onChange}
					 placeholder='Sua senha' required/>
					<div className='input-container'>
						<input className='btn btn-secondary'
							value='Limpar'
							type='button'
							onClick={limpar}/>
						<button className='btn btn-secondary'>Transferir</button>
					</div>
				</form>
			  </Container>
		   </div>
}
export default Transfer
