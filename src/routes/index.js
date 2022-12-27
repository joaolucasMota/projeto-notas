
import {Routes, Route} from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Private from './Private';

 function RoutesApp(){
    return(
        <Routes>
            <Route path="/login" element={ <Login/> } />
            <Route path="/register" element={ <Register/> } />
            <Route path="/" element={ <Private> <Home/> </Private> } />
        </Routes>
    )
}

export default RoutesApp;