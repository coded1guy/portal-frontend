import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const postApplicationAPI = async({ authToken, applicantData })=> {
  return await axios.post(
    `https://recruitment-portal-backend-production.up.railway.app/admin/createUser`,
    applicantData,
    {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
  );
}

const useCreateApplicant = ()=> {
  return useMutation({
    mutationFn: postApplicationAPI,
  });
}
export default useCreateApplicant;
