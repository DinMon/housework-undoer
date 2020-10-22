import React, { useEffect, useState } from 'react'
import TaskGrid from './TaskGrid'
import moment from 'moment'

function DateTaskGrid({ unixTime, tasks}) {
    const [isToday, setIsToday] = useState(false)
    const [date, setDate] = useState('')

    useEffect(() => {
        const day = moment.unix(unixTime)
        const newDate = day.format("dddd, MMMM D")
        setIsToday(moment().isSame(day, 'day'))
        setDate(newDate)
        console.log(tasks)
    }, [unixTime])

    return (
        <div className='date-task-grid'>
            <div className='date-description'>
                {isToday && <span className='today-badge'>Today</span>}
                <span>{date}</span>
            </div>
            <TaskGrid tasks={tasks} flippableTask={false}/>
        </div>
    )
}

export default DateTaskGrid