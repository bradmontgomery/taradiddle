import { Link, Outlet } from 'react-router-dom';

export default function Root() {
    return (
        <div>
            <nav>
                <p>
                    <a href="/">Home</a>
                    <Link to={`app`}>App</Link>
                    <Link to={`clock`}>Clock</Link>
                    <Link to={`namepicker`}>Name Picker</Link>
                    <Link to={`apifetcher`}>API Fetcher</Link>
                    <Link to={`names`}>Names</Link>
                </p>
            </nav>
            <hr />
            <div>
                <Outlet />
            </div>
        </div>

    )
}