import { Route, Routes } from "react-router-dom"
import Home from './pages/Home';
import Details from './pages/Details';

function App() {
  

  return (
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/:id' element={<Details/>}/>
    </Routes>
  )
}

export default App
