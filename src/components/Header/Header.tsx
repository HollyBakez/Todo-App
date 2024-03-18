import {Container, Navbar} from 'react-bootstrap/';
import "./Header.css";

const Header = () => {
    return (
        <Navbar data-bs-theme="dark" style={{background: "#393e53"}}>
            <Container>
                <Navbar.Brand href="#home">Todo App</Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default Header;