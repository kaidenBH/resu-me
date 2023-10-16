import { Route, Routes } from 'react-router-dom';
import Sign from './sign-Up-In/Sign';
import Home from './Home/Home';
import Resume from './resumes/Resume';

function Router() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route index path="/auth" element={<Sign />} />
			<Route index path="/resume/:resumeId" element={<Resume />} />
		</Routes>
	);
}

export default Router;
