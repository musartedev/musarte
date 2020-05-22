import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { DiscussionEmbed } from 'disqus-react'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

const Post = ({ data, location }) => {
    let post = data.ghostPost
    post.html = post.html.replace(/<a/g, `<a target="_blank" rel="noopener noreferrer"`)
    post.html = post.html.replace(/<img/g, `<img alt="musarte-blog-figure"`)

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="article"
            />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <div className="container">
                    <article className="content">
                        { post.feature_image ?
                            <figure className="post-feature-image">
                                <img src={ post.feature_image } alt={ post.title } />
                            </figure> : null }
                        <section className="post-full-content">
                            <h1 className="content-title">{post.title}</h1>

                            {/* The main post content */ }
                            <section
                                className="content-body load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: post.html }}
                            />
                            <div className="content-footer">
                                <div className="content-footer-date">
                                    {post.created_at_pretty}
                                </div>
                            </div>
                        </section>
                    </article>
                    <section className="comments">
                        <DiscussionEmbed
                            shortname="musarte"
                            config={{
                                url: post.url,
                                identifier: post.id,
                                title: post.title,
                            }}
                        />
                    </section>
                </div>
            </Layout>
        </>
    )
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
            created_at_pretty: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
    }
`
