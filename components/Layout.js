import Navigation from './Navigation';
import "../styles.scss";

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