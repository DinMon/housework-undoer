import React from 'react'
import Sidebar from '../components/Sidebar'
import PageNavigator from '../components/navigator/PageNavigator';
import HistoryPage from './HistoryPage';
import TodayPage from './TodayPage';

function DashboardPage() {
    return (
        <div className='dashboard-page'>
            <Sidebar />
            <div>
                <div>
                    <PageNavigator menuItems={['Today\'s Housework', 'History']}>
                        <TodayPage />
                        <HistoryPage />
                    </PageNavigator>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage