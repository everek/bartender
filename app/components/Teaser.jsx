import React from 'react'
import { Link } from 'remix'

export default function Teaser({ title, image, slug }) {
    return (
        <Link to={`recipe/${slug}`}>
            <div className="flex items-center flex-col">
                <div
                    className="w-full h-80 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${image})`,
                    }}
                ></div>
                <div className="border-2 -mt-4 border-black bg-white px-4 py-2 shadow-md">
                    <h3 className="text-md font-mono font-bold">{title}</h3>
                </div>
            </div>
        </Link>
    )
}
