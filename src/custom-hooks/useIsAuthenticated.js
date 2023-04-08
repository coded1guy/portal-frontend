import { useState, useEffect } from "react";
import { useSessionStorage } from "@/custom-hooks/useSessionStorage";
const useIsAuthenticated = ()=> {
  const drpToken = useSessionStorage("drpToken");
  if(drpToken) {
    return {
      isAuthenticated: true,
      authToken: drpToken
    }
  } else {
    return {
      isAuthenticated: false,
      authToken: drpToken
    }
  }
}
export default useIsAuthenticated;