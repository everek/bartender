import React from 'react'
import { useLoaderData } from 'remix'
import { useQuery, gql } from '@apollo/client'
import { render, NODE_UL, NODE_OL, NODE_LI } from 'storyblok-rich-text-react-renderer'

export const loader = async ({ params }) => {
    return params.slug
}

export let meta = () => {
    return {
        title: 'Remix Starter',
        description: 'Welcome to remix!',
    }
}

const query = gql`
    query Recipe($slug: ID!) {
        RecipeItem(id: $slug) {
            name
            content {
                description
                cover_image
                ingredients
                recipe
            }
        }
    }
`

export default function RecipeSlug() {
    const slug = useLoaderData()
    const { loading, error, data } = useQuery(query, {
        variables: { slug: `recipe/${slug}` },
    })

    if (loading) {
        return <p className="navbar-text navbar-right">Loading...</p>
    }

    const recipe = data.RecipeItem
    console.log(recipe)

    return (
        <div className="mt-8 flex items-center flex-col">
            <div
                className="w-[30rem] h-[35rem] bg-cover bg-center"
                style={{
                    backgroundImage: `url(${recipe.content.cover_image})`,
                }}
            ></div>
            <div className="border-4 -mt-10 border-black bg-white px-6 py-4 shadow-md">
                <h1 className="text-3xl font-mono font-bold">{recipe.name}</h1>
            </div>
            <div className="w-3/5 mt-8 font-mono">
                {recipe.content.description}
            </div>
            <div className="w-3/5 mt-8 font-mono">
                {render(recipe.content.ingredients, {
                    nodeResolvers: {
                        [NODE_UL]: (children) => {
                            return (
                                <ul className="ml-8 list-disc">{children}</ul>
                            )
                        },
                        [NODE_LI]: (children) => {
                            return <li className="mb-2">{children}</li>
                        },
                    },
                })}
            </div>
            <div className="w-3/5 mt-8 font-mono">
                {render(recipe.content.recipe, {
                    nodeResolvers: {
                        [NODE_OL]: (children) => {
                            return (
                                <ul className="ml-8 list-decimal">{children}</ul>
                            )
                        },
                        [NODE_LI]: (children) => {
                            return <li className="mb-2">{children}</li>
                        },
                    },
                })}
            </div>
        </div>
    )
}
