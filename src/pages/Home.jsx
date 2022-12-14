import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mx-auto h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center my-10">
          <h1 className="text-3xl font-bold">
            Welcome to the <span className="text-blue-500">RPC</span> extension
          </h1>
          <p className="text-xl">
            This extension is a proof of concept for the{" "}
            <span className="text-blue-500">RPC</span> protocol.
          </p>
          <p className="text-xl">It is not ready for production use.</p>
          <p className="text-xl">
            It is not a full implementation of the{" "}
            <span className="text-blue-500">RPC</span> protocol.
          </p>
        </div>
        <div class="btn-group ">
          <Link class="btn btn-outline" to="/rcp-node">
            Test RPC Node.js
          </Link>
          <Link class="btn btn-outline" to="/ethereum">
            Test RPC Ethereum
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
