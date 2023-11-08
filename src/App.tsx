import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Box } from '@mui/material';
import Router from './pages/Router';
import { UserProvider } from './components/context/AuthContext';
import { ResumeProvider } from './components/context/ResumeContext';
//import './App.css';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<UserProvider>
				<ResumeProvider>
					<Box
						sx={{
							width: '100vw',
							height: '100vh',
							position: 'fixed',
							background: '#213547',
							padding: 0,
							top: 0,
							left: 0,
						}}
					>
						<Router />
					</Box>
				</ResumeProvider>
			</UserProvider>
		</BrowserRouter>
	);
};

export default App;
