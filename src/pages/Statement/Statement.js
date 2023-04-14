import {useState, useEffect} from 'react'
import {Container, Card} from './styled'
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom'
import { url } from '../../constants/urls'
import axios from 'axios'
import { convertDate } from '../../utils/ConvertDate'




//==========================Component=======================
const Statement = ()=>{
	const history = useNavigate()
	const [transaction, setTransaction] = useState([])
	const [cpf, setCpf] = useState('')
	const [form, setForm] = useState({
		password:'',
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


	const statement = (e)=>{
		e.preventDefault()

		const body = {
			token: localStorage.getItem('token'),
			password: form.password,
			cpf: Number(cpf)
		}

		axios({
			method:'POST',
			url:`${url}/accounts/statement`,
			headers: {
				Authorization: localStorage.getItem('token')
			},
			data: body
		}).then(res=>{
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


	const limpar = ()=>{
		setCpf('')
		setForm({
			password:''
		})
	}


//===============================Renderizaão===========================
	return<div>
			<Header/>
			<Container className='content'>
					<h3>Extrato</h3>
				<form onSubmit={statement}>				
					<input className='form-control'
						name='cpf'
						value={cpf}
						onChange={handleCPF}
						maxLength='11'
						placeholder='CPF(somente números)'
						required/>
					<input className='form-control'
						name='password'
						value={form.password}
						onChange={onChange}
						type='password'
						placeholder='Sua senha'
						autoFocus
						required />
					<div className='input-container'>
						<input className='btn btn-secondary'
							value='Limpar'
							type='button'
							onClick={limpar}/>
						<button className='btn btn-secondary'>Consultar</button>
					</div>
					{transaction.length > 0 ? (
						<div style={{margin:'30px', width:'100%', textAlign:'center',fontSize:'1.5rem'}}>
							Resultado
							<div style={{border:'1px solid', width:'100%'}}/>
						</div>
					) : null}
					{transaction && transaction.map(state=>{
						return <Card key={state.id}>
								<b>Valor: </b>{state.value}<br/>
								<b>Data: </b>{convertDate(state.date)}<br/>
								<b>Descrição: </b>{state.description}<hr/>
							   </Card>
					})}
				</form>
			</Container>
		  </div>
}
export default Statement
