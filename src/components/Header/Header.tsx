import {Container, Nav, Navbar} from 'react-bootstrap/';
import "./Header.css";

const Header = () => {
    return (
        <Navbar  className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Todo App</Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default Header;