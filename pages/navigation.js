const Navigation = () => {
    return (
        <nav>
            <div className="navigation-wrapper">
                <a href="#" className="logo">
                    <div className="letter">t</div>
                    <div className="letter">h</div>
                    <div className="letter">m</div>
                    <div className="letter">s</div>
                    <div className="letter">l</div>
                    <div className="letter">d</div>
                    <div className="letter">x</div>
                </a>
                <ul className="navigation-desktop">
                    <li>
                        <a href="#personal">Personal</a>
                    </li>
                    <li>
                        <a href="#portfolio">Portfolio</a>
                    </li>
                    <li>
                        <a href="#freetime">Free Time</a>
                    </li>
                    <li>
                        <a href="#contact">Contact</a>
                    </li>
                </ul>
                <span className="navigation-mobile"></span>
            </div>
        </nav>
    )
};

export default Navigation;