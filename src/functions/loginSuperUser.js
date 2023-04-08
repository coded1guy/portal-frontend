import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const loginSuperUserAPI = async (loginData)=> {
  return await axios.post(
    `https://recruitment-portal-backend-production.up.railway.app/admin/postLogin`,
    loginData,
  );
}

export const useLoginSuperUser = ()=> {
  return useMutation({
    mutationFn: loginSuperUserAPI,
    onError: ()=> {
      throw new Error(
        `error logging into the web app`
      );
    }
  })
};
