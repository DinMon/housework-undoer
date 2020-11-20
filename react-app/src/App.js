import React, { useState, useContext, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { useHistory } from 'react-router-dom'
import { signOut, authListener } from './api/authentication/authenticateUser'

const UserLoginContext = React.createContext(null)

export function useUserLogged() {
	return useContext(UserLoginContext)
}

function App() {
    const history = useHistory()
	const [userLoggedIn, setUserLoggedIn] = useState(null)

	useEffect(() => {
		authListener(signUserIn)
	}, [])

	function signUserIn(user) {
		setUserLoggedIn(user)
		if (user) {
            history.replace('/')
		}
	}

	function signUserOut() {
		signOut()
	}

	return (
		<UserLoginContext.Provider value={{userLoggedIn, signUserOut }}>
			<Switch>
				<Route exact path="/">
					{userLoggedIn ? (
						<DashboardPage />
					): (
						<Redirect to="/login" />
					)}
				</Route>
				<Route path='/login'>
					<LoginPage />
				</Route>
			</Switch>
		</UserLoginContext.Provider>
	)
}

export default App;