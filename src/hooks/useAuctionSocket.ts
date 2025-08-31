import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const AUCTION_URL = "http://localhost:4040"; // backend URL

export default function useAuctionSocket(
  userType: "admin" | "team",
  teamId?: string
) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const query: any = {};
    if (userType === "team" && teamId) query.teamId = teamId;
    if (userType === "admin" && teamId) query.teamId = teamId;

    const socket = io(AUCTION_URL, { query });
    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [userType, teamId]);

  return socketRef;
}
