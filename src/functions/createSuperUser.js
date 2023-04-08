import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const createSuperUserAPI = async (formData)=> {
  return await axios.post(
    `https://recruitment-portal-backend-production.up.railway.app/admin/signup`,
    formData
  );
}

const useCreateSuperUser = ()=> {
  return useMutation({
    mutationFn: createSuperUserAPI,
  })
}

export default useCreateSuperUser;