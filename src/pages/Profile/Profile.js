import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import { url } from '../../constants/urls'
import { Container } from './styled'




const Profile = ()=>{
    const [user, setUser] = useState({})


    useEffect(()=>{
        const id = localStorage.getItem('id')

        axios.get(`${url}/accounts/${id}`).then(res=>{
            setUser(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }, [])

    return(
        <div>
            <Header/>
            <Container>
                <h3>{user.name}</h3>
                <div className='content'>
                    <b>Email: </b>{user.email}<br/>
                    <b>Saldo: </b>{user.balance}
                </div>
            </Container>
		    <Footer/>
        </div>
    )
}

export default Profile