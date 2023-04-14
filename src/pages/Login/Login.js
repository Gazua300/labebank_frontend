import styled from 'styled-components'
import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { url } from '../../constants/urls'
import axios from 'axios'


const Container = styled.div`
	margin: auto;
	width: 40vw;	
	border-radius: 10px;
	box-shadow: 3px 3px 7px;
	padding: 10px;

	@media(max-width: 500px){
		width: 80vw;		
	}
	
	form{
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 15px;
		margin: 10px;
	}

	.input-container{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 80%;		
	}
	

	input[type='button']{
		color: black;
		border-radius: 20px;
		width: 10vw;		

		&:hover{
			color:whitesmoke;
		}

		@media(max-width: 500px){
			width: 25vw;
		}
	}

	input{
		@media(max-width: 500px){
			width: 70vw;
		}
	}

	button{
		color: black;
		border-radius: 20px;
		width: 10vw;

		@media(max-width: 500px){
			width: 25vw;
		}
	}

`



const Login = ()=>{
	const history = useNavigate()
	const [form, setForm] = useState({
		email:'',
		cpf:'',
		password:''
	})


	useEffect(()=>{
		const token = localStorage.getItem('token')

		if(token){
			history('/balance')
		}

	}, [])


	const onChange = (e)=>{
		const {name, value} = e.target
		setForm({...form, [name]: value})
	}



	const register = (e)=>{
		e.preventDefault()

		const body = {
			email: form.email,
			password: form.password
		}
		axios.post(`${url}/accounts/login`, body).then(res=>{
			localStorage.setItem('token', res.data)
			history('/balance')
		}).catch(err=>{
			alert(err.response.data)
		})

	}


	const limpar = ()=>{
		setForm({
			email:'',
			password:''
		})
	}


//=========================Render=======================================
	return(
		<div style={{marginTop:'10%'}}>
			<Container>
				<h3 style={{textAlign:'center'}}>Acesse sua conta</h3>
				<form onSubmit={register}>
				<input className='form-control' 
					type='email'
					name='email'
					value={form.email}
					onChange={onChange}
					placeholder='nome@email.com'
					required
					autoFocus/>
				<input className='form-control' 
					type='password'
					name='password'
					value={form.password}
					onChange={onChange}
					placeholder='Senha'
					required/>
				<div className='input-container'>
					<input className='btn btn-secondary'
						value='Limpar'
						type='button'
						onClick={limpar}/>
					<button className='btn btn-secondary'>Acessar</button>
				</div>
				</form>
				<div>Clique <Link to='/signup'>aqui</Link> para abrir uma conta.</div>
			</Container>
		</div>
	)	
}
export default Login
