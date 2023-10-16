import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './pages/Router';
import { UserProvider } from './components/context/AuthContext';
import { ResumeProvider } from './components/context/ResumeContext';
import './App.css';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<UserProvider>
				<ResumeProvider>
					<Router />
				</ResumeProvider>
			</UserProvider>
		</BrowserRouter>
	);
};

export default App;
