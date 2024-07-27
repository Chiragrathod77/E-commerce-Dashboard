import './App.css';
import Nav from './Layouts/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Layouts/footer';
import Signup from './Layouts/signup';
import Add_Product from './Layouts/AddProduct'
import PrivateComponent from './Layouts/PrivateComponent';
import Login from './Layouts/login';
import Product from './Layouts/Product';
import UpdateProduct from './Layouts/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>  {/*This is Main body  */}
        <Nav /> {/** Print navbar */}

        {/** this is rout for urls in pass the routes 
       * If routes in any user is register then show rout and  open it
       * and you are not register then not access the all menus 
      */}
        <Routes>
          <Route element={<PrivateComponent />} >
            <Route path="/" element={<Product />} />
            <Route path="/add-product" element={<Add_Product />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>Logout Page</h1>} />
            <Route path="/profile" element={<h1>Profile Page</h1>} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      <Footer /> {/**This way to show footer file */}
    </div>
  );
}
export default App;
