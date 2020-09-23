import Navigation from './Navigation';
const Layout = (props) => {
  return (
    <>
      <Navigation />
      <main className="pt-20 px-4 md:px-0">
        {props.children}
      </main>
    </>
  )
}

export default Layout;