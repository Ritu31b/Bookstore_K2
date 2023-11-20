import './App.css';
import Navbar from './components/Navbar';
import Signup from './components/SignUp'
import Login from './components/Login'
import PrivateComponent from './components/PrivateComponent'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Pages/Home';
import AddBook from './Pages/AddBook';
import BookList from './Pages/BookList'
import EditBook from './Pages/EditBook';
import Profile from './Pages/Profile';
import Info from './components/Info';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route element={<PrivateComponent />} >
              <Route exact path='/' element={<Home />} />
              <Route exact path='/list' element={<BookList />} />
              <Route exact path='/add' element={<AddBook />} />
              <Route exact path='/profile' element={<Profile />} />
              <Route exact path='/edit/:id' element={<EditBook />} />
              <Route exact path='/info/:id' element={<Info />} />
            </Route>

            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
