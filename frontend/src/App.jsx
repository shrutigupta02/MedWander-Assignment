import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Home'
import Form from './Form';
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/form" element={<Form/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
