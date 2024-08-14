import { Link, Outlet } from 'react-router-dom';

export default function Root() {
    return (
        <div>
            <nav>
                <p>
                    <a href="/taradiddle/">Home</a>
                    <Link to={`/taradiddle/app`}>App</Link>
                    <Link to={`/taradiddle/clock`}>Clock</Link>
                    <Link to={`/taradiddle/namepicker`}>Name Picker</Link>
                    <Link to={`/taradiddle/apifetcher`}>API Fetcher</Link>
                    <Link to={`/taradiddle/names`}>Names</Link>
                </p>
            </nav>
            <hr />
            <div>
                <Outlet />
            </div>
        </div>

    )
}