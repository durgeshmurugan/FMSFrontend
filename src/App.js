import './App.css';
import "./index.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeNavbar from './home/HomeNavbar';
import AdminLogin from './admin/AdminLogin';
import AdminHome from './admin/AdminHome';
import SignInSide from './user/SignIn';
import SignUp from './user/SignUp';
import AddProduct from './admin/AddProduct';
import ViewProduct from './admin/ViewProduct';
import Views from './user/Views';
import CardApproval from './admin/CardApproval';
// import CardRequest from './user/CardRequest';
import ProductView from './user/ProductView';
// import Home from './home/HomeTwo';
import CardGeneration from './admin/CardGeneration';
// import YourCard from './user/YourCard';
import Request from './non-use/Request';
import CheckoutPage from './user/Buy';
import UserCard from './user/UserCard';
import CreateCard from './admin/CreateCard';
import CardRequest from './non-use/Request';
import CardLayer from './user/CardLayer';
import Checkout from './user/Transaction';
import Order from './user/Order';
import Trans from './user/Trans';
import ViewEach from './admin/ViewEach';
import EditProduct from './admin/EditProduct';


function App() {
  return (
    <Router>
      {/* <Home/> */}
      <Routes>
        <Route exact path='/' element={<HomeNavbar />}></Route>
        <Route exact path='/home' element={<HomeNavbar />}></Route>
        <Route exact path='/admin' element={<AdminLogin />}></Route>
        <Route exact path='/adminhome' element={<AdminHome />}></Route>
        <Route exact path='/signin' element={<SignInSide />}></Route>
        <Route exact path='/register' element={<SignUp />}></Route>
        <Route exact path='/addproduct' element={<AddProduct />}></Route>
        <Route exact path='/viewproduct' element={<ViewProduct />}></Route>
        <Route exact path='/userhome' element={<Views />}></Route>
        <Route exact path='/approvecard' element={<CardApproval />}></Route>
        <Route exact path='/eachproduct/:productId' element={<ProductView />}></Route>
        <Route exact path='/usercard' element={<CardRequest />}></Route>
        <Route exact path='/buy/:productId' element={<Trans />}></Route>
        <Route exact path='/cardgen/:userId' element={<CardGeneration />}></Route>
        <Route exact path='/yourcard' element={<UserCard />}></Route>
        <Route exact path='/CardLayer' element={<CardLayer />}></Route>
        <Route exact path='/order/:userId' element={<Order/>}></Route>
        <Route exact path='/vieweach/:productId' element={<ViewEach/>}></Route>
        <Route exact path='/edit/:productId' element={<EditProduct/>}></Route>
      </Routes>
    </Router>

  );
}

export default App;
