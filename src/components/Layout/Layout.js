import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';
const Layout = ({ children, description, title, keywords, author }) => {
    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
                <meta name='author' content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: '75vh' }}>
                <Toaster />
                {children}
            </main>
            <Footer />
        </>
    )
}

Layout.defaultProps = {
    title: 'Ecommerce App-shop now',
    description: 'mern stack project',
    keywords: 'mern , react, node, mongodb',
    author: 'Abhiraj',

}

export default Layout