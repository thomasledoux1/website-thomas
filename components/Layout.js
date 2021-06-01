import Navigation from './Navigation'
import Footer from './Footer'
const Layout = ({children}) => {
  return (
    <>
      <Navigation />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  )
}

export default Layout
