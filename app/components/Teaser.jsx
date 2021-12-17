import React from 'react'
import { Link } from 'remix'
import { motion } from 'framer-motion'

const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }

export default function Teaser({ title, image, slug }) {
    return (
        <Link to={`recipe/${slug}`}>
            <div className="flex items-center flex-col">
                <div className="overflow-hidden w-full">
                <motion.img
                    className="w-full h-80 object-cover"
                    src={image}
                    whileHover={{ scale: 1.1 }}
                    transition={transition}
                ></motion.img>
                </div>
                <div className="border-2 -mt-4 border-black bg-white px-4 py-2 shadow-md z-10">
                    <h3 className="text-md font-mono font-bold">{title}</h3>
                </div>
            </div>
        </Link>
    )
}
