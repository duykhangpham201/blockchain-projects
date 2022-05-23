import React, { useState } from "react";
import { Container, Col, Row, ButtonGroup, Button } from "react-bootstrap";
import SwapForm from "../components/SwapForm";
import ProvideForm from "../components/ProvideForm";
import WithdrawForm from "../components/WithdrawForm";
import abi from "../utils/RollswapPair.json";
import {
  PAIR_CONTRACT,
  OHM_CONTRACT,
  TIME_CONTRACT,
  tokenabi,
} from "../utils/constants";
import { ethers } from "ethers";

const MainScreen = ({ address }) => {
  const [form, setForm] = useState("provide");

  const contractAddress = PAIR_CONTRACT;
  const contractABI = abi.abi;

  const ohmAddress = OHM_CONTRACT;
  const timeAddress = TIME_CONTRACT;

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const RollswapPair = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  const Ohm = new ethers.Contract(ohmAddress, tokenabi, signer);

  const Time = new ethers.Contract(timeAddress, tokenabi, signer);

  const renderContent = () => {
    if (form === "swap") {
      return (
        <SwapForm
          address={address}
          RollswapPair={RollswapPair}
          Ohm={Ohm}
          Time={Time}
        />
      );
    } else if (form === "provide") {
      return (
        <ProvideForm
          address={address}
          RollswapPair={RollswapPair}
          Ohm={Ohm}
          Time={Time}
        />
      );
    } else if (form === "withdraw") {
      return <WithdrawForm RollswapPair={RollswapPair} />;
    }
  };

  return (
    <div>
      <Container className="pt-2">
        <Row style={{ alignItem: "center", textAlign: "center" }}>
          <Col xs={{ span: 4, offset: 4 }}>
            <ButtonGroup>
              <Button variant="light" onClick={() => setForm("swap")}>
                Swap
              </Button>
              <Button variant="light" onClick={() => setForm("provide")}>
                Provide
              </Button>
              <Button variant="light" onClick={() => setForm("withdraw")}>
                Withdraw
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        <br />
        <Row className="pt-4">
          <Col xs={{ span: 4, offset: 4 }}>{renderContent()}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainScreen;
