import React from 'react'

export default function RecipeContentContainer({ icon, title, children, id }) {
    return (
        <>
            {children && (
                <div className="flex mt-8 font-mono w-3/4" id={id}>
                    <div className="w-1/4 grow-0">
                        <h2 className="text-lg">{title}</h2>
                    </div>
                    <div className="w-3/4">{children}</div>
                </div>
            )}
        </>
    )
}
