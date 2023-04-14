import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { AiFillHome, AiOutlineLogout } from 'react-icons/ai'
import { useState } from 'react'



const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 15vh;
	
	
	#select{
		display: none;
	}

	@media(max-width: 630px){
		#btn-container{
			display: none;
		}

		#select{
			display: block;
		}
	}
	

	button{
		margin: 5px;
		border-radius: 20px;
		background-image: linear-gradient(gray, whitesmoke);

		&:hover{
			color:whitesmoke;
		}
	}
`


const Header = ()=>{
	const history = useNavigate()
	const [selectedOption, setSelectedOption] = useState()


	const handleSelect = (event)=>{
		const newOption = event.target.value

		if(newOption !== ''){
			history(`/${newOption}`)
		}

		setSelectedOption(newOption)
	}


	const logout = ()=>{
		const confirm = window.confirm('Tem certeza que quer sair da sua conta?')

		if(confirm){
			localStorage.clear()
			history('/login')
		}

	}


	return<Container>
			<AiFillHome style={{fontSize:'2rem', cursor:'pointer'}}
				onClick={()=> history('/')} />
			<div id='btn-container'>
				<button onClick={()=> history('/balance')}>Saldo</button>
				<button onClick={()=> history('/statement')}>Extrato</button>
				<button onClick={()=> history('/pay')}>Pagamentos</button>
				{/* <button onClick={()=> history('/profile')}>Conta</button> */}
				<button onClick={()=> history('/transfer')}>Transferências</button>
				<button onClick={()=> history('/deposit')}>Deposito</button>
			</div>
			<div id='select' onChange={handleSelect}
				value={selectedOption}>
				<select className='form-select'>
					<option value='balance'>Saldo</option>
					<option value='statement'>Extrato</option>
					<option value='pay'>Pagamentos</option>
					<option value='deposit'>Deposito</option>
					<option value='transfer'>Transferências</option>
				</select>
			</div>
			<AiOutlineLogout style={{fontSize:'2rem', cursor:'pointer'}}
				onClick={logout}/>
		  </Container>
}
export default Header
