import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const postApplicationAPI = async(applicantData)=> {
  let requestOptions = {
    method: 'POST',
    redirect: 'follow',
    body: JSON.stringify(applicantData)
  };

  const res = await fetch(
    `https://recruitment-portal-backend-production.up.railway.app/admin/postLogin`
    , requestOptions
  );

  if(!res.ok) {
    throw new Error("Error creating a new applicant");
  }

}

const PostApplicationSuccess = ()=> {
  const router = useRouter();
  console.log("the request was a success");
  alert("Applicant has been added to the database successfully");
  router.push("/");
}

const useCreateApplicant = ()=> {
  console.log("hello from create application");
  return useMutation({
    mutationFn: postApplicationAPI,
    onSuccess: PostApplicationSuccess,
    onError: ()=> {
      console.log("error error error");
    }
  });

}
export default useCreateApplicant;
