import Navigation from './Navigation';
const Layout = (props) => {
  return (
    <>
      <Navigation />
      <div className="pageWrapper">
        {props.children}
      </div>
    </>
  )
}

export default Layout;