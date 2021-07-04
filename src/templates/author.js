import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Author page (/author/:slug)
*
* Loads all posts for the requested author incl. pagination.
*
*/
const Author = ({ data, location }) => {
    const author = data.ghostAuthor
    const twitterUrl = `https://twitter.com/musartedev`
    const githubUrl = `https://github.com/musartedev`
    const instagramUrl = `https://instagram.com/musarte.dev`

    return (
        <>
            <MetaData data={data} location={location} type="profile" />
            <Layout>
                <div className="container">
                    <header className="author-header">
                        <div className="author-header-content">
                            <h1>{author.name}</h1>
                            {author.bio && <p>{author.bio}</p>}
                        </div>
                        <div className="author-header-image">
                            {author.profile_image && (
                                <img
                                    src={author.profile_image}
                                    alt={author.name}
                                />
                            )}
                        </div>
                    </header>
                    <main className="author-info">
                        <section className="author-bio">
                            <div className="author-bio-content">
                                ✨ Hola, puedes llamarme Mus. Soy Lic. en
                                Computación y desarrolladora Full Stack,
                                enfocada en MERN 🤓. También formo parte del
                                {` `}
                                <a
                                    href={`http://platzi.com`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Platzi Team 💚
                                </a>
                                {` `} como Front End Developer. Amo hacer (y
                                comer) pancakes 🥞, el yoga no falta en mi vida
                                y me gusta mucho bailar.
                            </div>
                        </section>
                        <section className="author-social">
                            <div className="author-social-content">
                                <p>
                                    👩🏽‍💻 Te invito a que mantengamos contacto a
                                    través de mis redes sociales:
                                </p>
                                <div className="author-social-links">
                                    <a
                                        href={twitterUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Twitter"
                                    >
                                        <span className="icon-twitter" />
                                    </a>
                                    <a
                                        href={instagramUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Instagram"
                                    >
                                        <span className="icon-instagram" />
                                    </a>
                                    <a
                                        href={githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Github"
                                    >
                                        <span className="icon-github" />
                                    </a>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </Layout>
        </>
    )
}

Author.propTypes = {
    data: PropTypes.shape({
        ghostAuthor: PropTypes.shape({
            name: PropTypes.string.isRequired,
            cover_image: PropTypes.string,
            profile_image: PropTypes.string,
            website: PropTypes.string,
            bio: PropTypes.string,
            location: PropTypes.string,
            facebook: PropTypes.string,
            twitter: PropTypes.string,
        }),
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default Author

export const pageQuery = graphql`
    query GhostAuthorQuery($slug: String!, $limit: Int!, $skip: Int!) {
        ghostAuthor(slug: { eq: $slug }) {
            ...GhostAuthorFields
        }
        allGhostPost(
            sort: { order: DESC, fields: [published_at] }
            filter: { authors: { elemMatch: { slug: { eq: $slug } } } }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    ...GhostPostFields
                }
            }
        }
    }
`
