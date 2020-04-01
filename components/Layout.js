import Navigation from './Navigation';
export default function Layout(props) {
    return (
        <>
            <Navigation />
            <div className="pageWrapper">
                {props.children}
            </div>
        </>
    )
}