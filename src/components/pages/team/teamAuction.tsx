import React, { useEffect, useState } from "react";
import { Button, Card, Typography, message, Row, Col, Divider } from "antd";
import useAuctionSocket from "../../../hooks/useAuctionSocket";
import useMisc from "../../../hooks/useMics";

const { Title, Text } = Typography;

interface Player {
  _id: string;
  fullName: string;
  image?: string;
  category?: string;
  baseRate?: number;
  playingStyle?: string;
  battingStyle?: string;
  bowlingStyle?: string;
  stats?: {
    matches?: number;
    runs?: number;
    wickets?: number;
  };
}

const TeamAuction = () => {
  const { authData } = useMisc();
  const socketRef = useAuctionSocket("team", authData?.data?._id);
  const [logs, setLogs] = useState<string[]>([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [currentBidder, setCurrentBidder] = useState<string | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [hasPlacedBid, setHasPlacedBid] = useState(false);

  const teamId = authData?.data?._id;

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    setSocketConnected(socket.connected);
    socket.on("connect", () => setSocketConnected(true));
    socket.on("disconnect", () => setSocketConnected(false));

    socket.on("auction-log", (message: string) => {
      setLogs((prev) => [...prev, message]);
    });

    socket.on("current-bidder", (bidderId: string) => {
      setCurrentBidder(bidderId);
    });

    socket.on("new-player", (player: Player) => {
      setCurrentPlayer(player);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("auction-log");
      socket.off("current-bidder");
      socket.off("new-player");
    };
  }, [socketRef]);

  useEffect(() => {
    if (currentBidder === teamId) {
      setHasPlacedBid(true);
    } else {
      setHasPlacedBid(false);
    }
  }, [currentBidder, teamId]);

  const placeBid = () => {
    if (!socketRef.current || !socketConnected) {
      message.error("Socket not connected!");
      return;
    }
    if (!teamId) {
      message.error("Team ID missing!");
      return;
    }
    socketRef.current.emit("place-bid", { teamId: String(teamId) });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Title level={3}>Team: {authData?.data?.fullName}</Title>

      {currentPlayer && currentBidder !== teamId && (
        <Button
          type="primary"
          onClick={placeBid}
          disabled={!socketConnected || hasPlacedBid}
        >
          Place Bid
        </Button>
      )}

      {currentPlayer && (
        <Card
          title="🎯 Current Player"
          className="mb-4"
          cover={
            currentPlayer.image && (
              <img
                alt={currentPlayer.fullName}
                src={currentPlayer.image}
                style={{ objectFit: "cover", maxHeight: "250px" }}
              />
            )
          }
        >
          <Row gutter={[16, 8]}>
            <Col span={12}>
              <Text strong>Name:</Text> {currentPlayer.fullName}
            </Col>
            <Col span={12}>
              <Text strong>Category:</Text>{" "}
              {currentPlayer.category || "Not specified"}
            </Col>
            <Col span={12}>
              <Text strong>Base Price:</Text> {currentPlayer.baseRate || 0}
            </Col>
            <Col span={12}>
              <Text strong>Playing Style:</Text>{" "}
              {currentPlayer.playingStyle || "Not specified"}
            </Col>
            <Col span={12}>
              <Text strong>Batting:</Text>{" "}
              {currentPlayer.battingStyle || "Not specified"}
            </Col>
            <Col span={12}>
              <Text strong>Bowling:</Text>{" "}
              {currentPlayer.bowlingStyle || "Not specified"}
            </Col>
          </Row>
          <Divider />
          <Row gutter={[16, 8]}>
            <Col span={8}>
              <Text strong>Matches:</Text> {currentPlayer.stats?.matches || 0}
            </Col>
            <Col span={8}>
              <Text strong>Runs:</Text> {currentPlayer.stats?.runs || 0}
            </Col>
            <Col span={8}>
              <Text strong>Wickets:</Text> {currentPlayer.stats?.wickets || 0}
            </Col>
          </Row>
        </Card>
      )}

      <Card title="📜 Auction Logs" bordered>
        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
          {logs.length > 0 ? (
            logs.map((log, i) => (
              <p key={i} style={{ margin: "4px 0" }}>
                {log}
              </p>
            ))
          ) : (
            <Text type="secondary">No logs yet...</Text>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TeamAuction;
