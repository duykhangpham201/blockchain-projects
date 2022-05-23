import React, { useEffect, useState} from 'react'
import { Button, Container } from '@mui/material'
import Lottery from './Lottery'


const Main = () => {
    const [currentAccount, setCurrentAccount] = useState(null)

  

    const {ethereum} = window;

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                console.log('Make sure you have metamask')
            } else {
    
                const accounts = await ethereum.request({ method: 'eth_accounts'})
    
                if(accounts.length!==0) {
                    const account = accounts[0]
                    console.log("Found an authorized account:", account)
                    setCurrentAccount(account)
                } else {
                    console.log("No authorized account found")
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
    },)

    // Render Methods
    const renderContent = () => {

    if (!currentAccount) {
      return (      
            <Button variant='contained' onClick={connectWalletAction}>
                Connect
            </Button>      
      );
    } else if (currentAccount) {
      return (
      <Lottery />
      )}
  };

  return(
      <Container style={{alignItems: "center", justifyContent: "center", display: "flex"}}>
          {renderContent()}
      </Container>
  )
    
}



export default Main
