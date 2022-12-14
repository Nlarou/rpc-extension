import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Ethereum from "./pages/Ethereum";
import RcpNode from "./pages/RcpNode";
import { WalletProvider } from "./Context/walletContext";
function App() {
  return (
    <WalletProvider>
      <Router>
        <>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/ethereum" element={<Ethereum />} />

            <Route path="/rcp-node" element={<RcpNode />} />
          </Routes>
        </>
      </Router>
    </WalletProvider>
  );
}

export default App;
