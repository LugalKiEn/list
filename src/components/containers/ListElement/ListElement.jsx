import React, { useState, useEffect } from 'react';
import ChangeTaskButton from '../../UI/Buttons/ChangeTaskButton/ChangeTaskButton';
import DeleteTaskButton from '../../UI/Buttons/DeleteTaskButton/DeleteTaskButton';
import "./ListElement.css";
import CheckBox from '../../UI/CheckBox/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, editTask, setIsFormVisible, setCurrentFormData } from '../../../redux/actions';
import ShowForm from '../../UI/Buttons/ShowForm/ShowForm';
// import AddTaskButton from '../../UI/Buttons/AddTaskButton/AddTaskButton';


const ListElement = ({id, parentId, title, description, completion, subtasks, level, children}) => {
    const isFormVisible = useSelector(state => state.isFormVisible)
    const dispatch = useDispatch();

    const deleteTaskHandler = () => {
        dispatch(deleteTask(id));
    }
    const checkTaskHandler = () => {
        dispatch(editTask({
            id: id,
            parentId: parentId,
            title: title,
            description: description,
            completion: !completion,
            subtasks: subtasks,
            level: level
        }));
    }
    const changeTaskHandler = () => {
        dispatch(setCurrentFormData({
            id: id,
            parentId: parentId,
            title: title,
            description: description,
            completion: completion,
            subtasks: subtasks,
            level: level,
        }));
        showForm();
    }

    const preAddTaskHandler = () => {
        dispatch(setCurrentFormData({
            id: null,
            parentId: id ? id : null,
            title: "",
            description: "",
            completion: false,
            subtasks: [],
            level: id ? 2 : 1,
        }));
        showForm();
    }

    const showForm = () => {
        dispatch(setIsFormVisible(!isFormVisible));
    }
    return (
        <div className={"list-element-container"} style={{paddingLeft: `${parentId ? "30px" : "0px"}`}}>
            <div className={"list-element-header"}>
                <h2 className={'list-element-title'}>{title}</h2>
                <div className={'list-element-navigation'}>
                    <CheckBox checked={completion} checkHandler={checkTaskHandler}/>
                    <ChangeTaskButton changeHandler={changeTaskHandler}/>
                    <DeleteTaskButton deleteHandler={deleteTaskHandler}/>
                    {level != 2 && (
                        <ShowForm clickHandler={preAddTaskHandler}/>
                    )}
                    {/* <ShowForm clickHandler={clickHandler}/> */}
                </div>
            </div>
            <p className={"list-element-description"}>{description}</p>
            {children}
        </div>
    )
}

export default ListElement;