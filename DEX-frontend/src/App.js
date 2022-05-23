import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WaitingScreen from "./screens/WaitingScreen";
import MainScreen from "./screens/MainScreen";
import { Container } from "react-bootstrap";

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const { ethereum } = window;

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        console.log("Make sure you have metamask");
      } else {
        const accounts = await ethereum.request({ method: "eth_accounts" });

        if (accounts.length !== 0) {
          const account = accounts[0];
          setCurrentAccount(account);
        } else {
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [currentAccount]);

  const renderContent = () => {
    if (!currentAccount) {
      return <WaitingScreen />;
    } else if (currentAccount) {
      return <MainScreen address={currentAccount} />;
    }
  };
  return (
    <div>
      <Header />
      <main className="pt-5">
        <Container>{renderContent()}</Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
