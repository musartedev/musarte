import React from "react"
import { Layout } from "../components/common"

// TODO: Get this info from an API :)
const Talks = () => (
    <Layout>
        <div className="container">
            <article className="content" style={{ textAlign: `center` }}>
                <figure className="post-feature-image">
                    <img
                        src="https://s3-us-east-2.amazonaws.com/musarte-blog/2020/07/plticas.png"
                        alt="Musarte - Charlas"
                    />
                </figure>
                <section className="content-body">
                    <div className="youtube-feed">
                        <div className="youtube-video">
                            <iframe
                                width="560"
                                height="315"
                                src="https://www.youtube.com/embed/dL_hkU9IBOM"
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="youtube-video">
                            <iframe
                                width="560"
                                height="315"
                                src="https://www.youtube.com/embed/dL_hkU9IBOM"
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                    <p>
                        Sigamos la conversación en
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="http://twitter.com/musarte"
                        >
                            <span className="icon-twitter icon-spacing"/>
                        </a>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="http://instagram.com/musarte.dev"
                        >
                            <span className="icon-instagram icon-spacing" />
                        </a>
                        .
                    </p>
                </section>
            </article>
        </div>
    </Layout>
)

export default Talks
