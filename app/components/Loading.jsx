import React from 'react'
import mixer from '../icons/mixer.svg'

export default function Loading() {
    return (
        <div className="w-full h-80 flex justify-center">
            <img className="w-16 animate-bounce" src={mixer} alt="mixer" />
        </div>
    )
}
