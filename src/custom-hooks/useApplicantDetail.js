import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const getApplicantData = async({ queryKey }) => {
  return await axios.get(
    `https://recruitment-portal-backend-production.up.railway.app/admin/getUser/${queryKey[1]}`
  );
}


const editApplicantAPI = async({ applicantId, applicantData })=> {
  return await axios.post(
    `https://recruitment-portal-backend-production.up.railway.app/admin/editUser/${applicantId}`,
    applicantData
  );
}

const deleteApplicantAPI = async(applicantId)=> {
  return await axios.delete(
    `https://recruitment-portal-backend-production.up.railway.app/admin/deleteUser/${applicantId}`
  );
}

export const useEditApplicant = ()=> {
  return useMutation({
    mutationFn: editApplicantAPI
  });
}

export const useDeleteApplicant = ()=> {
  return useMutation({
    mutationFn: deleteApplicantAPI,
  });
}