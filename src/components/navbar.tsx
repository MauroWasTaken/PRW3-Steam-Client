import '/src/assets/style/shared.css';
import '/src/assets/style/navbar.css';

export default function Navbar() {
    return (
        <div className={"nav_container"}>
            <a className={"nav_title"} href='/'>
                <h1>GameShelf</h1>
            </a>
        </div>
    )
}