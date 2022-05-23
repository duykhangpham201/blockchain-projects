import React, {useState} from 'react'
import abi from '../utils/Lottery.json'
import { CONTRACT_ADDRESS } from '../utils/constants'
//import { Button, Container } from '@mui/material'
import { ethers } from 'ethers'
import { Row, Form, Button, Container, Col } from 'react-bootstrap';

const Lottery = () => {
  const [enterAmount, setEnterAmount] = useState(0)
  const contractAddress = CONTRACT_ADDRESS
  const contractABI = abi.abi

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const lotteryContract = new ethers.Contract(contractAddress, contractABI, signer)

  const checkNetwork = async () => {
    try {
      if (window.ethereum.networkVersion !== '4') {
        alert("Please connect to Rinkeby!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const enterLottery = async (e) => {
    try {
      e.preventDefault()
      await lotteryContract.enterLottery({ value: ethers.utils.parseEther(enterAmount.toString())})
    } catch (error) {
      console.log(error)
    }    
  }

  const getPlayers = async () => {
    try {
      let players = await lotteryContract.getPlayers()
      console.log(players)
    } catch (error) {
      console.log(error)
    }
  }

  const pickWinner = async () => {
    try {
      await lotteryContract.pickWinner()
      console.log("winners has been picked")
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <Container className="text-center py-3">
      <Row className="text-center py-3">
        <Form onSubmit={enterLottery}>
          <Col>
            <Form.Control type="text"  onChange={(e) => setEnterAmount(e.target.value)}/>
          </Col>
          <Col>
            <Button variant='primary' type='submit'>Enter the Lottery</Button>
          </Col>
        </Form>
      </Row>
      <Row>
        <Button variant='success' onClick={getPlayers}>
        Get Players!
      </Button>
      <Button variant='danger' onClick={pickWinner}>
        Pick the Winner!
      </Button>

      </Row>
      
    </Container>

  )
}

export default Lottery