import './App.css';
import AddProduct from './Components/Pages/AddProduct';
import Home from './Components/Pages/Home';
import Login from './Components/Pages/Login';
import ProductDetail from './Components/Pages/ProductDetail';
import Registration from './Components/Pages/Registration'
import Card from './Components/UIC/Card';


// importing router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Login/>} />
        <Route path='/registration' element = {<Registration/>} />
        <Route path = '/add' element = {<AddProduct/>}></Route>
        <Route path = '/card' element = {<Card/>}></Route>
        <Route path = '/details' element = {<ProductDetail/>}></Route>
        <Route path = '/home' element = {<Home/>}></Route>
        <Route path="/product/:id" element={<ProductDetail />} />

      </Routes>
    </Router>
    
  );
}

export default App;