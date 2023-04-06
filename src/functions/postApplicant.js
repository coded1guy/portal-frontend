import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const postApplicationAPI = async(applicantData)=> {
  return await axios.post(
    `https://recruitment-portal-backend-production.up.railway.app/admin/postLogin`,
    applicantData
  );
}

const useCreateApplicant = ()=> {
  return useMutation({
    mutationFn: postApplicationAPI,
  });
}
export default useCreateApplicant;
