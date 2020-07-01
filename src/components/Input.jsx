import React, { Component, useState } from 'react';


const Input = ({ onAddClick }) => {

    const [state, setState] = useState({
        name: '',
        nickname: ''
    })
   

    const updateValue = (fieldName, value) => {
         setState({
             ...state,
             [fieldName]: value
        })
    }

    const _onAddClick = () => {
        onAddClick(state.name, state.nickname);
    }

    
    return (
        <div className="app-input">
                
            <span>Name:
                <input type="text" onChange={(e) => {
                    updateValue('name', e.target.value)
                    }} />
            </span>
            <span>
                <span>        Nickname:
                <input type="text" onChange={(e) => {
                    updateValue('nickname', e.target.value)
                }} /></span>
            </span>
            <button onClick={() => {
                _onAddClick()
            }}>Add
            </button>
        </div>
    );
    
}

//Input.PropTypes = {
//    onAddClick: React.PropTypes.func
//};
//
export default Input;