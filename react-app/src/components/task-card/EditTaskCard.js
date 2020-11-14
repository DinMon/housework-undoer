import React, { useState, useEffect } from 'react'
import Card from './Card'
import Button from '../Button'
import updateTask from '../../api/task/updateTask'
import deleteTask from '../../api/task/deleteTask'

function EditTaskCard({ task, flipBack, className, ...rest }) {
    const [saveLoading, setSaveLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [reward, setReward] = useState(0)

    useEffect(() => {
        setTitle(task.title)        
        setReward(task.rewardPoints)        
    }, [])

    async function saveTask(task, title, rewardPoints) {
        try {
            setSaveLoading(true)
            await updateTask({
                ...task,
                title,
                rewardPoints
            })
            setSaveLoading(false)
        } catch (error) {
            console.log(error) 
        }
    }

    async function removeTask(id) {
        try {
            setDeleteLoading(true)
            await deleteTask(id)
        } catch (error) {
            console.log(error) 
        }
    }

    function titleChange(event) {
        setTitle(event.target.value)
    }

    function rewardChange(event) {
        try {
            setReward(Number(event.target.value))
        } catch (err) {
            setReward(task.rewardPoints)
        }
    }

    return (
        <div className='edit-card-container'>
            <Card colour='#FFE8DB' className={`detail-task-card no-box-shadow ${className}`} {...rest}>
                <div className='text-emphasis'>Change task</div>
                <div>
                    <div className='form-label'>Title</div>
                    <textarea className='none-resizable borderless-textbox textbox-padding' rows='3' value={title} onChange={titleChange}/>
                </div>
                <div>
                    <div className='form-label'>Reward</div>
                    <input className='textbox borderless-textbox textbox-padding' type='text' value={String(reward)} onChange={rewardChange}/>
                </div>
            </Card>
            <div className='edit-card-sub-container'>
                <div className='edit-card-btn-stack'>
                    <Button className='empty-btn' onClick={flipBack}>Cancel</Button>
                    <Button className='fill-btn' onClick={() => saveTask(task, title, reward)} isLoading={saveLoading}>Save</Button>
                </div>
                <Button className='fill-btn danger-btn' onClick={() => removeTask(task && task.id)} isLoading={deleteLoading}>Delete 💀</Button>
            </div>
        </div>
    )
}

export default EditTaskCard