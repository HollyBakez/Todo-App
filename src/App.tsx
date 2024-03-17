import './App.css'
import {Container} from 'react-bootstrap/';

import Header from './components/Header/Header'
import Todos from './components/Todos/Todos';


function App() {

  return (
    <>
      <Header/>
        <Container className=' justify-content-center align-items-center'>
        <Todos/>
        </Container>
    </>
  )
}

export default App
