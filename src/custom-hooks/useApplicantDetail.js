import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const getApplicantData = async({ queryKey }) => {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  const res = await fetch(
    `https://recruitment-portal-backend-production.up.railway.app/admin/getUser/${queryKey[1]}`,
    requestOptions
  )

  if(!res.ok) {
    throw new Error(`Error getting the user with id ${queryKey[1]}`);
  }

  return res.text();
}


const editApplicantAPI = async({ applicantId, applicantData })=> {
  let requestOptions = {
    method: 'POST',
    redirect: 'follow',
    body: JSON.stringify(applicantData)
  };
  const res = await fetch(
    `https://recruitment-portal-backend-production.up.railway.app/admin/editUser/${applicantId}`
    , requestOptions
  );

  if(!res.ok) {
    throw new Error(`Error editing applicant with ${applicantId}`);
  }

  return res.text();
}

const deleteApplicantAPI = async(applicantId)=> {
  let requestOptions = {
    method: 'DELETE',
    redirect: 'follow',
  };
  const res = await fetch(
    `https://recruitment-portal-backend-production.up.railway.app/admin/deleteUser/${applicantId}`
    , requestOptions
  );

  if(!res.ok) {
    throw new Error(`Error deleting applicant with ${applicantId}`);
  }
}

export const useEditApplicant = ()=> {
  return useMutation({
    mutationFn: editApplicantAPI
  });
}

export const useDeleteApplicant = ()=> {
  return useMutation({
    mutationFn: deleteApplicantAPI,
    onSuccess: ()=> {
      const router = useRouter();
      router.push("/");
    }
  });
}