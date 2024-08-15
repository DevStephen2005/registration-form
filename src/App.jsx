import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import RegistrationForm from './components/RegistrationForm'
import RegisterSuccess from './components/RegisterSuccess'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RegistrationForm />} ></Route>
        <Route path='/registrationSuccess' element={<RegisterSuccess />} ></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
