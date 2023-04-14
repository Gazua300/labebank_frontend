import styled from 'styled-components'
import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { MdArrowBackIosNew } from 'react-icons/md'
import {url} from '../../constants/urls'



const Container = styled.div`
	padding: 10px;
	margin: auto;
	width: 40vw;
	border-radius: 10px;
	box-shadow: 3px 3px 7px;

	@media(max-width: 500px){
		width: 80vw;
	}

	h3{
		text-align: center;
	}
	form{
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 15px;
		margin: 10px;		
	}

	input{
		width: 30vw;

		@media(max-width: 500px){
			width: 60vw;
		}
	}
	input[type='date']{
		width: 30vw;

		@media(max-width: 500px){
			width: 60vw;
		}
	}

	.input-container{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 80%;
	}

	input[type='button']{
		width: 10vw;
		border-radius: 20px;
		color: black;

		&:hover{
			color: whitesmoke;
		}

		@media(max-width: 500px){
			width: 25vw;
		}
	}

	button{
		width: 10vw;
		border-radius: 20px;
		color: black;

		@media(max-width: 500px){
			width: 25vw;
		}
	}

`



const Signup = ()=>{
	const history = useNavigate()
	const [cpf, setCpf] = useState('')
	const [form, setForm] = useState({
		name:'',
		email:'',
		initialDate:'',
		password:'',
		confPassword:''
	})	
	
	
	const onChange = (e)=>{
		const {name, value} = e.target
		setForm({...form, [name]: value})
	}
	

	const handleCPF = (e)=>{
        const inputValue = e.target.value
    
        if(!isNaN(inputValue)){
            setCpf(inputValue)
        }
    }


	const signup = (e)=>{
		e.preventDefault()

		const convert = form.initialDate.split('-')
		const date = `${convert[2]}/${convert[1]}/${convert[0]}`

		const body = {
			name: form.name,
			cpf: Number(cpf),
			email: form.email,
			initialDate: date,
			password: form.password,
			passwordConf: form.confPassword
		}
		axios.post(`${url}/accounts/create`, body).then(res=>{
			localStorage.setItem('token', res.data)
			history('/balance')
		}).catch(err=>{
			alert(err.response.data.message)
		})
	}


	const limpar = ()=>{
		setCpf('')
		setForm({
			name:'',			
			email:'',
			initialDate:'',
			password:'',
			confPassword:''
		})
	}

//=========================Render=======================================
	return<div>
			<MdArrowBackIosNew onClick={()=> history('/login')} 
				style={{fontSize:'2rem', cursor:'pointer', marginBottom:30}}/> 
			<Container>
			<h3>Cadastre-se</h3>
			<form onSubmit={signup}>
				<input className='form-control' 
					type='text' name='name' value={form.name} onChange={onChange}
				 	placeholder='Nome de usuário' autoFocus required/>				
				<input className='form-control'
					type='email' name='email' value={form.email} onChange={onChange}
				 	placeholder='E-mail' required/>
				<input className='form-control' maxLength='11'
					type='text' value={cpf} onChange={handleCPF}
					placeholder='CPF(somente números)' required/>
				<input className='form-control' maxLength='10'
					type='date' name='initialDate' value={form.initialDate} onChange={onChange}
				 	required/>
				<input className='form-control'
					type='password' name='password' value={form.password} onChange={onChange}
				 	placeholder='Senha' required/>
				<input className='form-control'
					type='password' name='confPassword' value={form.confPassword} onChange={onChange}
				 	placeholder='Confirme sua senha'/>
				<div className='input-container'>
					<input className='btn btn-secondary'
						value='Limpar' 
						type='button'
						onClick={limpar}/>
					<button className='btn btn-secondary'>Cadastrar</button>
				</div>
			</form>
		  </Container>
		  </div>
}
export default Signup
