import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const getApplicantData = async({ queryKey }) => {
  const { applicantId, authToken } = queryKey[1];
  return await axios.get(
    `https://recruitment-portal-backend-production.up.railway.app/admin/getUser/${applicantId}`,
  {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }
  );
}


const editApplicantAPI = async({ applicantId, applicantData, authToken })=> {
  return await axios.post(
    `https://recruitment-portal-backend-production.up.railway.app/admin/editUser/${applicantId}`,
    applicantData,
    {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
  );
}

const deleteApplicantAPI = async({ applicantId, authToken })=> {
  return await axios.delete(
    `https://recruitment-portal-backend-production.up.railway.app/admin/deleteUser/${applicantId}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
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