import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const loginSuperUserAPI = async ({ email, password })=> {
  let requestOptions = {
    method: 'POST',
    body: JSON.stringify({"email": email, "password": password}),
    redirect: 'follow',
    contentType: "application/json"
  };

  const res = await fetch(
    `https://recruitment-portal-backend-production.up.railway.app/admin/postLogin`
    , requestOptions
  );

  console.log(res.text());
  if (!res.ok) {
    throw new Error(
      `error logging into the web app`
    );
  }

  return res.text();
}
export const useLoginSuperUser = ()=> {
  return useMutation({
    mutationFn: loginSuperUserAPI,
    onSuccess: ()=> {
      const router = useRouter();
      alert("user has been created");
      router.push('/login');
    },
    onError: (error)=> {
      alert(error.message);
    }
  })
};