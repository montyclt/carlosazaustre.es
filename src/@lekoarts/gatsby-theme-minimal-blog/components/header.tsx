/** @jsx jsx */
import { jsx, useColorMode, Styled } from "theme-ui"
import { Link } from "gatsby"
import { Flex } from "@theme-ui/components"
import useSiteMetadata from "../hooks/use-site-metadata"
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config"
import ColorModeToggle from "./colormode-toggle"
import Navigation from "./navigation"
import replaceSlashes from "../utils/replaceSlashes"
import logo from "../../../../static/favicon-32x32.png"
import ExternalLink from "../../../components/external-link"

const Header = () => {
  const { siteTitle } = useSiteMetadata()
  const { navigation: nav, externalLinks, basePath } = useMinimalBlogConfig()
  const [colorMode, setColorMode] = useColorMode()
  const isDark = colorMode === `dark`
  const toggleColorMode = (e: any) => {
    e.preventDefault()
    setColorMode(isDark ? `light` : `dark`)
  }

  return (
    <header sx={{ mb: [4, 5] }}>
      <Flex sx={{ alignItems: `center`, justifyContent: `space-between` }}>
        <Link
          to={replaceSlashes(`/${basePath}`)}
          aria-label={`${siteTitle} - Back to home`}
          sx={{ color: `heading`, textDecoration: `none` }}
        >
          <div sx={{ my: 0, fontWeight: `medium`, fontSize: [3, 4] }}>
              <img src={logo} alt={siteTitle} />&nbsp; 
              {siteTitle}
         </div>
        </Link>
        <ColorModeToggle isDark={isDark} toggle={toggleColorMode} />
      </Flex>
      <div
        sx={{
          boxSizing: `border-box`,
          display: `flex`,
          variant: `dividers.bottom`,
          alignItems: `center`,
          justifyContent: `space-between`,
          mt: 3,
          color: `secondary`,
          a: { color: `secondary`, ":hover": { color: `heading` } },
          flexFlow: `wrap`,
        }}
      >
        <Navigation nav={nav} />

        {externalLinks && externalLinks.length > 0 && (
          <div sx={{ "a:not(:first-of-type)": { ml: 3 }, fontSize: [1, `18px`] }}>
            {externalLinks.map(link => (
              <ExternalLink key={link.url} href={link.url} text={link.name} />
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
