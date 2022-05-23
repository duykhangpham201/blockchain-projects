import React, { useState } from "react";
import { Form, Container, Card, Button, Row, Col } from "react-bootstrap";
import { ethers } from "ethers";

const SwapForm = ({ address, RollswapPair, Ohm, Time }) => {
  const [token0, setToken0] = useState(null);

  const swap = async (e) => {
    try {
      e.preventDefault();
      await RollswapPair.swapToken0forToken1(
        ethers.utils.parseEther(token0.toString())
      );
      console.log("Swapped!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <Form onSubmit={swap}>
        <Container className="pt-2">
          <h4>Swap Ohm for Time</h4>

          <Form.Group className="mb-3">
            <Form.Control
              placeholder="0.0"
              onChange={(e) => setToken0(e.target.value)}
            />
          </Form.Group>
          <div className="mb-2">
            <Row>
              <Col xs={3}>
                <Button variant="success" type="submit" class>
                  Swap
                </Button>
              </Col>
            </Row>
          </div>
        </Container>
      </Form>
    </Card>
  );
};

export default SwapForm;
