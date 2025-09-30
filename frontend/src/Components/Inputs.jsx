import React from 'react'
import { useReducer } from 'react';


const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE': {
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        }
        default: {
            return state
        }
    }
}

export default function Inputs(props) {

    
    const onChangeHandler = (event) => {
        console.log(event.target.value);
    }

    const element = props.element === 'input' ? (
        <input
            type={props.type}
            placeholder={props.placeholder}
            element={props.element}
            className={props.className}
            onChange={onChangeHandler}
            value={props.value}

        ></input>
    ) : (
        <textarea
            placeholder={props.placeholder}
            className={props.className}
            onChange={onChangeHandler}
            value={props.value}
        ></textarea>
    )
    return (
        <div>
            {element}
        </div>
    )
}
