import Navigation from './Navigation'
import * as React from 'react'
const Layout = props => {
  return (
    <>
      <Navigation />
      <main className="pt-16">{props.children}</main>
    </>
  )
}

export default Layout
