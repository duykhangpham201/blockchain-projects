import React from 'react'
import { Container, Navbar, Nav } from "react-bootstrap";
import ConnectButton from './ConnectButton'
import logo from "../logo.png";

const Header = () => {
    return (
        <header>
            <Navbar fixed ="top" expand="sm" bg="dark" variant="dark">
                <Container className='LatoFont'>
                    <Navbar.Brand style={{fontSize: "24px"}}>
                        <img
							alt=""
							src={logo}
							width="40"
							height="40"
							className="d-inline-block align-center"
						/>
                        
                        <strong>&nbsp;RollSwaps</strong>
                        
                    </Navbar.Brand>
                    <Nav className='mr-auto'>
                        <ConnectButton />
                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
