import {
    Link,
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useCatch,
} from 'remix'
import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    ApolloProvider,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { AnimatePresence } from 'framer-motion'

import styles from './tailwind.css'

const httpLink = createHttpLink({
    uri: 'https://gapi.storyblok.com/v1/api',
})

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            token: 'GaleXF2y7ayytams8hRnyAtt',
            version: 'public',
        },
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})

export function links() {
    return [{ rel: 'stylesheet', href: styles }]
}

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
    return (
        <ApolloProvider client={client}>
            <AnimatePresence initial={false} exitBeforeEnter>
                <Document>
                    <Layout>
                        <Outlet />
                    </Layout>
                </Document>
            </AnimatePresence>
        </ApolloProvider>
    )
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }) {
    console.error(error)
    return (
        <Document title="Error!">
            <Layout>
                <div>
                    <h1>There was an error</h1>
                    <p>{error.message}</p>
                    <hr />
                    <p>
                        Hey, developer, you should replace this with what you
                        want your users to see.
                    </p>
                </div>
            </Layout>
        </Document>
    )
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
    let caught = useCatch()

    let message
    switch (caught.status) {
        case 401:
            message = (
                <p>
                    Oops! Looks like you tried to visit a page that you do not
                    have access to.
                </p>
            )
            break
        case 404:
            message = (
                <p>
                    Oops! Looks like you tried to visit a page that does not
                    exist.
                </p>
            )
            break

        default:
            throw new Error(caught.data || caught.statusText)
    }

    return (
        <Document title={`${caught.status} ${caught.statusText}`}>
            <Layout>
                <h1>
                    {caught.status}: {caught.statusText}
                </h1>
                {message}
            </Layout>
        </Document>
    )
}

function Document({ children, title }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1"
                />
                {title ? <title>{title}</title> : null}
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
                {process.env.NODE_ENV === 'development' && <LiveReload />}
            </body>
        </html>
    )
}

function Layout({ children }) {
    return (
        <div className="container mx-auto py-4">
            <div className="mb-12">
                <Link className="font-mono text-4xl	underline" to="/">
                    Bartender
                </Link>
            </div>
            <div>{children}</div>
        </div>
    )
}
