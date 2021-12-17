import { useLoaderData, json, Link } from 'remix'
import { useQuery, gql } from '@apollo/client'
import Teaser from '~/components/Teaser'
import Loading from '~/components/Loading'

// https://remix.run/api/conventions#meta
export let meta = () => {
    return {
        title: 'Remix Starter',
        description: 'Welcome to remix!',
    }
}

const query = gql`
    {
        RecipeItems(per_page: 10, starts_with: "recipe/") {
            items {
                id
                name
                slug
                content {
                    cover_image
                }
            }
        }
    }
`

// https://remix.run/guides/routing#index-routes
export default function Index() {
    const { loading, error, data } = useQuery(query)

    if (loading) {
        return <Loading />
    }

    console.log('data', data)
    // https://remix.run/api/remix#json
    console.log(data)

    return (
        <div>
            <div className="grid grid-cols-4 gap-4 mt-10">
                {data.RecipeItems.items.map((recipe) => (
                    <Teaser
                        key={recipe.id}
                        title={recipe.name}
                        slug={recipe.slug}
                        image={recipe.content.cover_image}
                    />
                ))}
            </div>
        </div>
    )
}
