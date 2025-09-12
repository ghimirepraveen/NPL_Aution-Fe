import React, { useEffect, useState } from "react";
import useAuctionSocket from "../../../hooks/useAuctionSocket";
import useMisc from "../../../hooks/useMics";
import { Row, Col, Card, Button } from "antd";

const AdminAuction = () => {
  const logsEndRef = React.useRef<HTMLDivElement>(null);
  const { authData } = useMisc();
  const socketRef = useAuctionSocket("admin", authData?.data?._id);
  const [logs, setLogs] = useState<string[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<any>(null);
  const [currentBid, setCurrentBid] = useState<number>(0);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    socket.on("auction-log", (message: string) => {
      setLogs((prev) => [...prev, message]);

      if (message.includes("was unsold") || message.includes("won")) {
        setCurrentPlayer(null);
      }
    });

    socket.on("new-player", (player) => {
      setCurrentPlayer(player);
      setCurrentBid(player.baseRate);
    });

    socket.on("unsold-player", () => {
      setCurrentPlayer(null);
    });

    socket.on("bid-winner", () => {
      setCurrentPlayer(null);
    });

    return () => {
      socket.off("auction-log");
      socket.off("new-player");
      socket.off("unsold-player");
      socket.off("bid-winner");
    };
  }, [socketRef]);

  // Auto-scroll to latest log
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const startBidding = () => {
    socketRef.current?.emit("start-bidding");
  };

  return (
    <div className="max-w-2xl mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Admin Auction Dashboard</h2>

      {currentPlayer ? (
        <Card className="mb-4 p-4 shadow-md">
          <Row gutter={16} align="middle">
            <Col span={16}>
              <p>
                <strong>Player:</strong> {currentPlayer.fullName}
              </p>
              <p>
                <strong>Current Bid:</strong> {currentBid}
              </p>
              <p>
                <strong>Category:</strong>{" "}
                {currentPlayer.category || "Not specified"}
              </p>
            </Col>
            <Col span={8} style={{ textAlign: "right" }}>
              <img
                src={currentPlayer.image || ""}
                alt={currentPlayer.fullName}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                }}
              />
            </Col>
          </Row>
        </Card>
      ) : (
        <Button type="primary" className="mb-4" onClick={startBidding}>
          Start Bidding
        </Button>
      )}

      <div>
        <h3 className="font-semibold">Logs:</h3>
        <div className="h-80 overflow-y-auto border p-2 bg-gray-50 rounded">
          {logs.map((log, i) => (
            <div
              key={i}
              className="flex items-center gap-2 py-2 px-3 mb-2 rounded bg-white shadow-sm border border-gray-200 last:mb-0"
              style={{ animation: "fadeIn 0.3s" }}
            >
              <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
              <span className="text-gray-700 text-sm font-medium">{log}</span>
            </div>
          ))}
          <div ref={logsEndRef} />
        </div>
      </div>
    </div>
  );
};

export default AdminAuction;
