import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/signup';
import Stat from './pages/stat';
import Home from './pages';
import ReadingTable from './pages/readingtable';
import Profile from './pages/profile';
import Login from './pages/login';


function App() {
return (
	<Router>
	<Navbar />
	<Routes>
        <Route path='/' element={<Home />} />
		<Route path='/stats' element={<Stat />} />
		<Route path='/signup' element={<SignUp />} />
		<Route path='/readingTable' element={<ReadingTable />} />
		<Route path='/profile' element={<Profile />} />
		<Route path='/login' element={<Login />} />
	</Routes>
	</Router>
);
}

export default App;
