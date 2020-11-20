import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PasswordAvatar from './components/PasswordAvatar';

const UserLoginContext = React.createContext(null)

export function useUserLogged() {
	return useContext(UserLoginContext)
}

function App() {
	const [userLoggedIn, setUserLoggedIn] = useState(null)

	function signUserOut() {
		setUserLoggedIn(null)
	}

	return (
		<Router>
			<UserLoginContext.Provider value={{userLoggedIn, setUserLoggedIn, signUserOut }}>
				<Switch>
					<Route exact path="/">
						{userLoggedIn ? (
							<DashboardPage />
						): (
							<Redirect to="/login" />
						)}
					</Route>
					<Route path='/login'>
						<LoginPage logUserIn={setUserLoggedIn}/>
					</Route>
					<Route path='/secure-login'>
						<PasswordAvatar />
					</Route>
				</Switch>
			</UserLoginContext.Provider>
		</Router>
	)
}

export default App;