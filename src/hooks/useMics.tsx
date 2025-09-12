import { useOutletContext } from "react-router-dom";

import { TEAM, ADMIN, SUPER_ADMIN } from "./../constants/userRole";

type Role = typeof TEAM | typeof ADMIN | typeof SUPER_ADMIN;

type OutletContextType = {
  authLoading: boolean;
  authFetchStatus: "fetching" | "paused" | "idle";
  authRefetch: () => void;
  authData:
    | undefined
    | {
        title: string;
        message: string;
        data: {
          _id: string;
          email: string;
          fullName: string;
          isBlocked: boolean;
          userType: Role;
          image: string;
          budget: number;
          remainingBudget: number;
        };
      };
  authLogout: () => void;
};

export default function useMisc() {
  return useOutletContext<OutletContextType>();
}
