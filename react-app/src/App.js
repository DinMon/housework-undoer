import React, { useState } from 'react';
import PageNavigator from './components/navigator/PageNavigator';
import HistoryPage from './pages/HistoryPage';
import TodayPage from './pages/TodayPage';

function App() {
	const [menuItems] = useState([
		'Today\'s Housework',
		'History'
	])
	
	return (
		<div>
			<div className='page-navigator-container'>
				<PageNavigator menuItems={menuItems}>
					<TodayPage />
					<HistoryPage />
				</PageNavigator>
			</div>
		</div>
	)
}

export default App;