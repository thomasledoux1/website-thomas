import Navigation from './Navigation';
const Layout = (props) => {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        {props.children}
      </main>
    </>
  )
}

export default Layout;