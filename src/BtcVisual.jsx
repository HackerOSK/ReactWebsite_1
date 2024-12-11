import React, { lazy, Suspense, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import "./App.css"; // TailwindCSS can be included here if configured.
import client, { ethClient } from './apolloClient';
import backgroundVid from './assets/VisualizerBackground.mp4';
import LoadingScreen from './Components_Interaction/LoadingScreen'

const NoSSRForceGraph = lazy(() => import("./lib/NoSSRForceGraph")); // Lazy load the graph component.

const getTransactionQuery = gql`
query GetTransaction($hash: String!) {
  transaction(hash: $hash) {
    hash
    fee
    totalVinValue
    totalVoutValue
    vin {
      address
    }
    vout {
      address
    }
    anomaly
  }
}
`;

const getTransactionRelationsQuery = gql`
  query GetTransactionRelations($transactionHash: String!) {
    getTransactionRelations(transactionHash: $transactionHash) {
      source
      target
      value
      type
    }
  }
`;

const truncateAddress = (address) =>
  address.length > 12 ? `${address.slice(0, 6)}...${address.slice(-4)}` : address;

const formatData = (transactionData, relationsData) => {
  const nodes = [];
  const links = [];

  if (!transactionData || !transactionData.transaction || !relationsData) {
    return { nodes, links };
  }

  const { transaction } = transactionData;

  nodes.push({
    id: transaction.hash,
    label: truncateAddress(transaction.hash),
    group: "transaction",
    size: 15,
    fee: transaction.fee,
    totalVinValue: transaction.totalVinValue,
    totalVoutValue: transaction.totalVoutValue,
    anomaly: transaction.anomaly,
  });

  transaction.vin.forEach((vin) => {
    if (!nodes.find((node) => node.id === vin.address)) {
      nodes.push({
        id: vin.address,
        label: truncateAddress(vin.address),
        group: "vin",
        size: 10,
      });
    }
  });

  transaction.vout.forEach((vout) => {
    if (!nodes.find((node) => node.id === vout.address)) {
      nodes.push({
        id: vout.address,
        label: truncateAddress(vout.address),
        group: "vout",
        size: 10,
      });
    }
  });

  relationsData.forEach((relation) => {
    links.push({
      source: relation.source,
      target: relation.target,
      type: relation.type,
      value: relation.value,
    });
  });

  return { nodes, links };
};

function BtcVisual() {
  const [hash, setHash] = useState("");
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [transactionData, setTransactionData] = useState(null);
  const [relationsData, setRelationsData] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoadingBTC, setIsLoadingBTC] = useState(true);
  


  useEffect(() => {
		// Set a timer for 3 seconds to transition to the main page
		const timer = setTimeout(() => {
			setIsLoadingBTC(false);
		}, 3000);

		return () => clearTimeout(timer); // Cleanup the timer
	}, []);

  


  



  const { refetch: refetchTransaction } = useQuery(getTransactionQuery, {
    variables: { hash: hash },
    skip: true,
    client, // Explicitly specify the `client`
    onCompleted: (data) => setTransactionData(data),
  });
  
  const { refetch: refetchRelations } = useQuery(getTransactionRelationsQuery, {
    variables: { transactionHash: hash },
    skip: true,
    client, // Explicitly specify the `client`
    onCompleted: (data) => setRelationsData(data.getTransactionRelations),
  });

  useEffect(() => {
    if (transactionData && relationsData) {
      const formattedData = formatData(transactionData, relationsData);
      setGraphData(formattedData);
    }
  }, [transactionData, relationsData]);

  const handleSearch = () => {
    refetchTransaction({ hash });
    refetchRelations({ transactionHash: hash });
    setSelectedNode(null);
    setSelectedLink(null);
    setIsSidebarOpen(false);
  };

  const handleHighlightAnomalies = () => {
    setGraphData((prevData) => {
      const updatedNodes = prevData.nodes.map((node) => {
        if (node.anomaly) {
          return { ...node, color: "red" };
        }
        return { ...node, color: node.group === "transaction" ? "gold" : "gray" };
      });
      return { ...prevData, nodes: updatedNodes };
    });
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".sidebar")) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isSidebarOpen]);

  const renderSidebarContent = () => {
    const renderDetails = (details) => (
      <div className="border rounded-md shadow-md overflow-hidden">
        <div className="grid grid-cols-2 bg-gray-100 font-semibold text-gray-800">
          <div className="p-2 border-b border-r">Key</div>
          <div className="p-2 border-b">Value</div>
        </div>
        <div className="divide-y">
          {Object.entries(details).map(([key, value]) => (
            <div key={key} className="grid grid-cols-2">
              <div className="p-2 border-r font-medium text-gray-600">{key}</div>
              <div className="p-2 flex justify-between items-center">
                <span className="whitespace-nowrap overflow-auto max-w-full">
                  {typeof value === "object" ? JSON.stringify(value) : value.toString()}
                </span>
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => navigator.clipboard.writeText(value)}
                >
                  Copy
                </button>
              </div>
            </div>
          ))}
        </div>
        {details.Group === "transaction" && (
          <div className="p-4">
            <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
              Check Mixers
            </button>
          </div>
        )}
        {details.Group === "vin" && (
          <div className="flex g-2 p-4">
            <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
              Add to WatchList
            </button>
            <button className="bg-red-300 text-white px-4 py-2 rounded hover:bg-red-400">
              Get Personal Info
            </button>
          </div>
        )}
        {details.Group === "vout" && (
          <div className=" flex g-2 p-4">
            <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
              Add to WatchList
            </button>
            <button className="bg-red-300 text-white px-4 py-2 rounded hover:bg-red-400">
              Get Personal Info
            </button>
          </div>
        )}
      </div>
    );
  
    if (selectedNode) {
      const nodeDetails = {
        ID: selectedNode.id,
        Label: selectedNode.label,
        Group: selectedNode.group,
        Fee: selectedNode.fee ? selectedNode.fee : "N/A",
        TotalVinValue: selectedNode.totalVinValue ? selectedNode.totalVinValue : "N/A",
        TotalVoutValue: selectedNode.totalVoutValue ? selectedNode.totalVoutValue : "N/A",
      };
      return (
        <div className="space-y-6">
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md text-sm font-semibold">
            Node Details
          </div>
          {renderDetails(nodeDetails)}
        </div>
      );
    }
  
    if (selectedLink) {
      const linkDetails = {
        Source: selectedLink.source.id,
        Target: selectedLink.target.id,
        Type: selectedLink.type,
        Value: selectedLink.value,
      };
      return (
        <div className="space-y-6">
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md text-sm font-semibold">
            Link Details
          </div>
          {renderDetails(linkDetails)}
        </div>
      );
    }
  
    return (
      <div className="text-gray-500 text-center py-4">No details to display.</div>
    );
  };
  
  if (isLoadingBTC) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Video background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={backgroundVid}
        autoPlay
        loop
        muted
      ></video>
      
      <header className="relative p-6 flex justify-between items-center z-1">
        <h1 className="text-4xl font-bold text-white">Transaction Visualizer</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Enter transaction hash"
            className="p-3 rounded-lg text-black w-80 focus:ring-2 focus:ring-blue-500"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-800"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-800"
            onClick={handleSearch}
          >
            Normalise
          </button>
          <button
            className="px-4 py-2 bg-red-400 rounded-lg hover:bg-red-600"
            onClick={handleSearch}
          >
            Anomalous
          </button>
        </div>
      </header>

      {isSidebarOpen && (
        <div className="sidebar fixed top-20 right-0 w-1/3 h-[calc(100%-5rem)] bg-gray-100 text-black shadow-lg rounded-l-lg p-6 z-50 overflow-y-auto">
          {renderSidebarContent()}
        </div>
      )}

      <div className="relative h-screen">
        <Suspense fallback={<div>Loading Graph...</div>}>
          <NoSSRForceGraph
            graphData={graphData}
            nodeAutoColorBy="group"
            linkDirectionalParticles={2}
            linkDirectionalParticleSpeed={0.02}
            onNodeClick={(node) => {
              setSelectedNode(node);
              setSelectedLink(null);
              setIsSidebarOpen(true);
            }}
            onLinkClick={(link) => {
              setSelectedLink(link);
              setSelectedNode(null);
              setIsSidebarOpen(true);
            }}
            nodeCanvasObject={(node, ctx) => {
              const isSelected = selectedNode && selectedNode.id === node.id;
              const radius = isSelected ? 10 : 7; // Highlight selected node with a larger radius
              ctx.beginPath();
              ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
              ctx.fillStyle =
                node.group === "transaction"
                  ? "gold"
                  : node.group === "vin"
                  ? "crimson"
                  : "gray";
              ctx.fill();
              ctx.font = "2px Arial";
              ctx.fillStyle = "white";
              ctx.textAlign = "center";
              ctx.fillText(node.label, node.x, node.y);
            }}
            linkCanvasObject={(link, ctx) => {
              const isSelected =
              selectedLink &&
              selectedLink.source.id === link.source.id &&
              selectedLink.target.id === link.target.id;
              let linkColor  = link.type === "FUNDS" ? "lime" : "red";
  
              ctx.strokeStyle = isSelected ? "cyan" : linkColor; // Highlight color for selected link
              ctx.lineWidth = isSelected ? 1.5 : 0.5; // Thicker line for selected link
              ctx.beginPath();
              ctx.moveTo(link.source.x, link.source.y);
              ctx.lineTo(link.target.x, link.target.y);
              ctx.stroke();
            }}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default BtcVisual;
