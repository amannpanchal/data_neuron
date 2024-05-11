import React from 'react'
import { Rnd } from 'react-rnd'
import './Elements.css'
import Details from '../Details/Details'
const Elements = () => {
    return (
        <div className='elements'>

            <Rnd
                dragAxis='none'
            >
                <div
                    className='componentOne'>
                Component 1
                </div>
            </Rnd>
            <Rnd
                dragAxis='none'
                
            >
                <div className='componentTwo'>

                <Details/>
                </div>
            </Rnd>
            <Rnd
                dragAxis='none'
            >
                <div className='componentThree'>
                Component 3
                </div>
            </Rnd>
        </div>
    )
}

export default Elements