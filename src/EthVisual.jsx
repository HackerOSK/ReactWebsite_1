import React, { lazy, Suspense, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import "./App.css"; // TailwindCSS can be included here if configured.
import client, { ethClient } from './apolloClient';
import backgroundVid from './assets/VisualizerBackground.mp4'
import {Link} from 'react-router-dom'

const NoSSRForceGraph = lazy(() => import("./lib/NoSSRForceGraph")); // Lazy load the graph component.

// Queries
const WALLET_TRANSACTIONS_QUERY = gql`
  query WalletTransactions($walletAddress: ID!) {
    walletTransactions(walletAddress: $walletAddress) {
      hash
      amount
      relationshipType
    }
  }
`;

const END_TO_END_TRANSACTIONS_QUERY = gql`
  query WalletEndToEndTransactions($walletAddress: ID!) {
    walletTransactions_With_Wallet(walletAddress: $walletAddress) {
      transaction {
        hash
        amount
      }
      fromWallet
      toWallet
      relationshipType
    }
  }
`;

const formatTransactionData = (transactions) => {
  const nodes = [];
  const links = [];

  // Add wallet node
  nodes.push({
    id: "wallet",
    label: "Wallet",
    group: "wallet",
    size: 20,
  });

  // Add transaction nodes and links
  transactions.forEach((transaction) => {
    // console.log(transaction.relationshipType);

    if(transaction.hash!=null)
      {
    nodes.push({
      id: transaction.hash,
      label: `Tx: ${transaction.hash.slice(0, 6)}...`,
      group: "transaction",
      type: transaction.relationshipType,
      size: 15,
    });

    links.push({
      source: "wallet", // Wallet is the source
      target: transaction.hash, // Transaction ID is the target
      value: transaction.amount, // Transaction amount
      type: transaction.relationshipType,
    });
  }
  });

  console.log("Nodes : ",nodes);
  console.log("Links : ",links);

  return { nodes, links };
};

const formatTransactionData1 = (transactions) => {
  const nodes = [];
  const links = [];

  // Add transaction nodes and links
  transactions.forEach(({ transaction, fromWallet, toWallet, relationshipType }) => {
    if(relationshipType==="SELF")
      {
        nodes.push({ id: fromWallet, label: `Send: ${fromWallet.slice(0, 6)}...`, group: "wallet", type: relationshipType });

      }
    if(transaction.hash!=null)
      {
    if (!nodes.some((n) => n.id === fromWallet)) {
      nodes.push({ id: fromWallet, label: `Send: ${fromWallet.slice(0, 6)}...`, group: "wallet", type: relationshipType });
    }
    if (!nodes.some((n) => n.id === toWallet)) {
      nodes.push({ id: toWallet, label: `Recv: ${toWallet.slice(0, 6)}...`, group: "wallet", type: relationshipType});
    }
    if (!nodes.some((n) => n.id === transaction.hash)) {
      nodes.push({ id: transaction.hash, label: `Tx: ${transaction.hash.slice(0, 6)}...`, group: "transaction" });
    }
    links.push({
      source: fromWallet,
      target: transaction.hash,
      value: transaction.amount,
      type: relationshipType,
    });
    links.push({
      source: transaction.hash,
      target: toWallet,
      value: transaction.amount,
      type: relationshipType,
    });
  }
  });

  return { nodes, links };
};

export default function EthVisual() {
  const [walletAddress, setWalletAddress] = useState("");
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [filterType, setFilterType] = useState("all"); // "all" or "end-to-end"
  const [valueFilter, setValueFilter] = useState({ min: 0, max: Infinity }); // Value range filter
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const { data: allData, refetch: fetchAllTransactions } = useQuery(
    WALLET_TRANSACTIONS_QUERY,
    {
      client: ethClient,
      variables: { walletAddress },
      skip: !walletAddress || filterType !== "all", // Run only for "all"
    }
  );

  const { data: endToEndData, refetch: fetchEndToEnd } = useQuery(
    END_TO_END_TRANSACTIONS_QUERY,
    {
      client: ethClient,
      variables: { walletAddress },
      skip: !walletAddress || filterType !== "end-to-end", // Run only for "end-to-end"
    }
  );

  const filterTransactionsByValue = (data) => {
    return data.filter((transaction) => {
      const amount = transaction.amount || 0;
      return amount >= valueFilter.min && amount <= valueFilter.max;
    });
  };

  const filterTransactionsByValue1 = (data) => {
    return data.filter((transaction) => {
      const amount = transaction.transaction.amount || 0;
      return amount >= valueFilter.min && amount <= valueFilter.max;
    });
  };

  useEffect(() => {
    setGraphData({ nodes: [], links: [] }); // Clear graph data when filter or address changes
    if (walletAddress) {
      if (filterType === "all") {
        fetchAllTransactions({ walletAddress });
      } else if (filterType === "end-to-end") {
        fetchEndToEnd({ walletAddress });
      }
    }
    setSelectedNode(null);
    setSelectedLink(null);
    setIsSidebarOpen(false);
  }, [walletAddress, filterType, valueFilter]);

  useEffect(() => {
    if (allData && filterType === "all") {
      const filteredData = filterTransactionsByValue(allData.walletTransactions);
      setGraphData(formatTransactionData(filteredData));
    }
    if (endToEndData && filterType === "end-to-end") {
      const filteredData = filterTransactionsByValue1(endToEndData.walletTransactions_With_Wallet);
      setGraphData(formatTransactionData1(filteredData));
    }
    setSelectedNode(null);
    setSelectedLink(null);
    setIsSidebarOpen(false);
  }, [allData, endToEndData, valueFilter]);

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
        {details.Group === "wallet" && (
          <div className="flex g-2 p-4">
            <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
              Add to WatchList
            </button>
            <button className="bg-red-300 text-white px-4 py-2 rounded hover:bg-red-400">
             <Link to="/biodata1"> Get Personal Info</Link>
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
      <header className="relative p-6 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-white">Wallet Transactions Visualizer</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Enter wallet address"
            className="p-3 rounded-lg text-black w-80"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
          <select
            className="px-4 py-2 bg-gray-700 rounded-lg text-white"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Transactions</option>
            <option value="end-to-end">End-to-End Transactions</option>
          </select>
          <input
            type="number"
            placeholder="Min Value"
            className="p-3 rounded-lg text-black w-32 bg-blue-500"
            onChange={(e) => setValueFilter((prev) => ({ ...prev, min: Number(e.target.value) || 0 }))}
          />
          <input
            type="number"
            placeholder="Max Value"
            className="p-3 rounded-lg text-black w-32 bg-red-500"
            onChange={(e) => setValueFilter((prev) => ({ ...prev, max: Number(e.target.value) || Infinity }))}
          />
        </div>
      </header>

      {isSidebarOpen && (
        <div className="sidebar fixed top-20 right-0 w-1/3 h-[calc(100%-5rem)] bg-gray-100 text-black shadow-lg rounded-l-lg p-6 z-50 overflow-y-auto">
          {renderSidebarContent()}
        </div>
      )}

      <div className="relative h-screen">
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
            if(node.group==="wallet" & node.type==="SELF")
              {
                ctx.fillStyle="blue";
              }
              else
              {
            // Set node color based on transaction type
            ctx.fillStyle =
              node.group === "wallet"
                ? "gold"
                : node.group === "transaction"
                ? node.type === "SENT_FROM"
                  ? "gray" // Gray for SENT_FROM
                  : "crimson" // Crimson for SENT_TO or others
                : "silver"; // Default color for unknown groups
          }
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
        
            let linkColor = "lime"; // Default color
            if (link.type === "SENT_TO") {
              linkColor = "green";
            } else if (link.type === "SENT_FROM") {
              linkColor = "red";
            }
        
            ctx.strokeStyle = isSelected ? "cyan" : linkColor; // Highlight color for selected link
            ctx.lineWidth = isSelected ? 1.5 : 0.5; // Thicker line for selected link
            ctx.beginPath();
            ctx.moveTo(link.source.x, link.source.y);
            ctx.lineTo(link.target.x, link.target.y);
            ctx.stroke();
          }}
        />
      </div>
    </div>
  );
}

