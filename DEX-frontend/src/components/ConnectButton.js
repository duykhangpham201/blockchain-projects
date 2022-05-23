import React, { useEffect, useState} from 'react'
import { Button,Modal } from "react-bootstrap";

const ConnectButton = () => {
    const [currentAccount, setCurrentAccount] = useState(null)
    const { ethereum } = window;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                console.log('Make sure you have metamask')
            } else {
    
                const accounts = await ethereum.request({ method: 'eth_accounts'})
    
                if(accounts.length!==0) {
                    const account = accounts[0]
                    setCurrentAccount(account)
                } else {
                }
            }
        } catch (error) {
            console.log(error)
        }       
    }

    const connectWalletAction = async () => {
        try {
            const {ethereum} = window
            if (!ethereum) {
                alert('Please get Metamask!')
            }

            const accounts = await ethereum.request({
                method:'eth_requestAccounts'
            })

            console.log('Connected', accounts[0])
            setCurrentAccount(accounts[0])
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        checkIfWalletIsConnected();
    },[])

    const renderContent = () => {
        if (!currentAccount) {
            return (
                <Button variant='success' onClick= {connectWalletAction}>
                    <strong>Connect To Wallet</strong>
                </Button>
            )
        } else if (currentAccount) {
            return(
                <div>
                    <Button variant='secondary' onClick={handleShow}>
                        <strong>{currentAccount.substring(0,6)}...{currentAccount.substring(38,42)}</strong>
                    </Button>
                    <Modal show={show} onHide={handleClose} animation={false}>
                        <Modal.Header closeButton>
                             <Modal.Title>Account Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Connected With metamask <br/>
                        Account: {currentAccount}</Modal.Body>
                    </Modal>   
                </div>
            )            
        }
    }

    return (
        <div>
            {renderContent()}
        </div>
    )
}

export default ConnectButton
