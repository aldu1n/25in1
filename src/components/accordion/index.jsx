import { useState } from 'react';

import data from './data.json';

import './styles.css';

export default function Accordion() {

    const [selected, setSelected] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);

    function handleSingleSelection(id) {
        setSelected(id === selected ? null : id);
    };

    function handleMultiSelection(id) {
        let copyMultiple = [...multiple];
        const findIndexOfId = copyMultiple.indexOf(id);

        if (findIndexOfId === -1) copyMultiple.push(id);
        else copyMultiple.splice(findIndexOfId, 1);

        setMultiple(copyMultiple);

        console.log(selected, multiple)
    }


    return (
        <div className='wrapper'>
            <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
                Enable Multi Selection
            </button>
            <div className='accordion'>
                <h1><span className='blue'>Facts</span> About <span className='red'>Countries</span></h1>
                {
                    data && data.length > 0
                        ? data.map(dataItem => <div className='item'>
                            <div
                                onClick={() =>
                                    enableMultiSelection
                                        ? handleMultiSelection(dataItem.id)
                                        : handleSingleSelection(dataItem.id)}
                                className='title'
                            >
                                <h3>{dataItem.title}</h3>
                                <span>+</span>
                            </div>
                            {
                                selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1
                                    ? (<div className='content'>{dataItem.content}</div>)
                                    : null
                            }
                        </div>
                        )
                        : <div> No data found ! </div>
                }
            </div>
        </div>
    );
};