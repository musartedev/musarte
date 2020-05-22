import React from "react"
import { Link } from "gatsby"
import { Layout } from "../components/common"

const NotFoundPage = () => (
    <Layout>
        <div className="container">
            <article className="content" style={{ textAlign: `center` }}>
                <h1 className="content-title">4🤔4</h1>
                <section className="content-body">
                    <p>
                        Creo que estás un poco perdido. ¿Quieres{` `}
                        <Link to="/">volver al inicio</Link>?
                    </p>
                    <p>
                        También puedes seguirme en{` `}
                        <a target="_blank" href="http://twitter.com/musarte">
                            Twitter
                        </a>{` `}
                        e{` `}
                        <a
                            target="_blank"
                            href="http://instagram.com/musarte.dev"
                        >
                            Instagram
                        </a>
                        .
                    </p>
                </section>
            </article>
        </div>
    </Layout>
)

export default NotFoundPage
