import {BrowserRouter} from 'react-router-dom'
import GlobalState from './global/GlobalState'
import Router from './routes/Routes'
import {createGlobalStyle} from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css'



const GlobalStyle = createGlobalStyle`
	body{
    background-image: linear-gradient(90deg, whitesmoke, gray);
    background-size: cover;
    margin: 30px;
	}

  h3{
    text-shadow: 2px 2px 4px whitesmoke;
  }

  input{
    @media(max-width: 500px){
			width: 60vw;
		}
  }

`

function App() {
  return (
    <BrowserRouter>
      <GlobalState>
    	  <GlobalStyle/>
   		  <Router/>
      </GlobalState>   		
    </BrowserRouter>
  );
}

export default App;
