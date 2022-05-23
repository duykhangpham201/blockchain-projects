import React, { useState, useEffect } from "react";
import { Form, Container, Card, Button, Row, Col } from "react-bootstrap";
import { ethers } from "ethers";
import { PAIR_CONTRACT } from "../utils/constants";

const ProvideForm = ({ address, RollswapPair, Ohm, Time }) => {
  const [token0, setToken0] = useState(null);
  const [token1, setToken1] = useState(null);
  const [allowance, setAllowance] = useState(null);

  const contractAddress = PAIR_CONTRACT;

  const provideLiquidity = async (e) => {
    try {
      e.preventDefault();

      await RollswapPair.addLiquidity(
        ethers.utils.parseEther(token0.toString()),
        ethers.utils.parseEther(token1.toString())
      );
      console.log("Provided Liquidity!");
    } catch (error) {
      console.log(error);
    }
  };

  const maxUint256 = 1000;

  const approveHandler = async (e) => {
    try {
      e.preventDefault();
      await Ohm.approve(
        contractAddress,
        ethers.utils.parseEther(maxUint256.toString())
      );

      await Time.approve(
        contractAddress,
        ethers.utils.parseEther(maxUint256.toString())
      );
    } catch (error) {
      console.log(error);
    }
  };

  const checkAllowance = async () => {
    try {
      const OhmAllow = await Ohm.allowance(address, contractAddress);
      const TimeAllow = await Time.allowance(address, contractAddress);
      if (OhmAllow > 1000 && TimeAllow > 1000) {
        setAllowance("approved");
      }
      console.log(OhmAllow, TimeAllow);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAllowance();
  });

  return (
    <Card>
      <Form onSubmit={provideLiquidity}>
        <Container className="pt-2">
          <h4>Provide</h4>

          <Form.Group className="mb-3">
            <Form.Control
              placeholder="0.0"
              onChange={(e) => setToken0(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="0.0"
              onChange={(e) => setToken1(e.target.value)}
            />
          </Form.Group>
          <div className="mb-2">
            <Row>
              <Col xs={3}>
                <Button variant="success" type="submit" class>
                  Submit
                </Button>
              </Col>
              <Col xs={4}></Col>
              <Col xs={3}>
                <Button onClick={approveHandler}>Approve</Button>
              </Col>
            </Row>
          </div>
        </Container>
      </Form>
    </Card>
  );
};

export default ProvideForm;
