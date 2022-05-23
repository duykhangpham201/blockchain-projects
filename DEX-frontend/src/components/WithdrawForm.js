import React, { useEffect, useState } from "react";
import { Form, Container, Card, Button, Row, Col } from "react-bootstrap";
import { ethers } from "ethers";

const WithdrawForm = ({ RollswapPair }) => {
  const [lpToken, setLpToken] = useState(null);

  const withdrawLiquidity = async (e) => {
    try {
      e.preventDefault();
      await RollswapPair.removeLiquidity(
        ethers.utils.parseEther(lpToken.toString())
      );
    } catch (error) {}
  };

  return (
    <Card>
      <Form onSubmit={withdrawLiquidity}>
        <Container className="pt-2">
          <h4>Withdraw</h4>

          <Form.Group className="mb-3 pt-2">
            <Form.Control
              placeholder="0.0"
              onChange={(e) => setLpToken(e.target.value)}
            />
          </Form.Group>
          <div className="mb-2">
            <Button variant="success" type="submit" class>
              Submit
            </Button>
          </div>
        </Container>
      </Form>
    </Card>
  );
};

export default WithdrawForm;
