import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { Link, StaticQuery, graphql } from "gatsby"

import { Navigation } from "."
import config from "../../utils/siteConfig"
import MusarteLogo from "./MusarteLogo"

// Styles
import "../../styles/app.css"
import "../../styles/icons.css"

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
const DefaultLayout = ({ data, children }) => {
    let websiteTheme
    if (typeof window !== `undefined`) {
        websiteTheme = window.__theme
    }

    const [theme, setTheme] = useState(websiteTheme)

    const site = data.allGhostSettings.edges[0].node
    const twitterUrl = site.twitter
        ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}`
        : null
    const instagramUrl = `https://www.instagram.com/musarte.dev`
    const githubUrl = `https://github.com/musenberg404`

    useEffect(() => {
        setTheme(window.__theme)
        window.__onThemeChange = () => {
            setTheme(window.__theme)
        }
    }, [])

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <body />
            </Helmet>

            <div className="viewport">
                <div className="viewport-top">
                    {/* The main header section on top of the screen */}
                    <header className="site-head">
                        <div className="container">
                            <div className="site-mast">
                                <div className="site-mast-left">
                                    <Link to="/">
                                        <MusarteLogo
                                            className={`site-logo`}
                                            width={100}
                                        />
                                    </Link>
                                </div>
                                <div className="site-mast-right">
                                    <div className="site-mast-social">
                                        {site.twitter && (
                                            <a
                                                href={twitterUrl}
                                                className="site-nav-item"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <span className="site-nav-icon icon-twitter" />
                                            </a>
                                        )}
                                        <a
                                            href={instagramUrl}
                                            className="site-nav-item"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <span className="site-nav-icon icon-instagram" />
                                        </a>
                                        <a
                                            className="site-nav-item"
                                            href={`https://feedly.com/i/subscription/feed/${config.siteUrl}/rss/`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <span className="site-nav-icon icon-rss" />
                                        </a>
                                        <a
                                            className="site-nav-item"
                                            href={githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <span className="site-nav-icon icon-github" />
                                        </a>
                                    </div>
                                    <div className="dark-mode">
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            id="checkbox"
                                            onChange={() => {
                                                window.__setPreferredTheme(
                                                    theme === `dark`
                                                        ? `light`
                                                        : `dark`
                                                )
                                            }}
                                            checked={theme === `light`}
                                        ></input>
                                        <label
                                            className="switch"
                                            htmlFor="checkbox"
                                        >
                                            {theme !== `dark` ? (
                                                <span className="dark-mode-icon">
                                                    🌜
                                                </span>
                                            ) : (
                                                <span className="light-mode-icon">
                                                    ☀️
                                                </span>
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <nav className="site-nav">
                                <div className="site-nav-left">
                                    <Navigation
                                        data={site.navigation}
                                        navClass="site-nav-item"
                                    />
                                </div>
                            </nav>
                        </div>
                    </header>

                    <main className="site-main">{children}</main>
                </div>

                <div className="viewport-bottom">
                    {/* The footer at the very bottom of the screen */}
                    <footer className="site-foot">
                        <div className="site-foot-nav container">
                            <div className="site-foot-nav-left">
                                Hecho con 💜 por
                                <a
                                    className="site-foot-nav-item"
                                    href={githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Mariangélica Useche
                                </a>
                                {` `}© 2020
                            </div>
                            <div className="site-foot-nav-right">
                                <Navigation
                                    data={site.navigation}
                                    navClass="site-foot-nav-item"
                                />
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: { eq: "ghost-icon.png" }) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
)

export default DefaultLayoutSettingsQuery
