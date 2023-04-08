import { useState, useEffect } from "react";
import Head from 'next/head';
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import homeStyles from "@/styles/Home.module.css";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/Searchbar";
import UserList from "@/components/UserList";
import HomeActionPanel from "@/components/HomeActionPanel";
import getAllApplicants from "@/functions/getAllApplicants";

export default function Home() {
  const [authToken, setAuthToken ]  = useState("");

  const router = useRouter();

  const [ allUsers, setAllUsers ] = useState([]);

  const result = useQuery({
    queryKey: ["getAll", authToken],
    queryFn: getAllApplicants,
    enabled: false,
    onError: (error)=> {
      console.log(error.response);
      //alert(error.response);
    },
    onSuccess: (data)=> {
      console.log("success", data.data);
      setAllUsers(data.data.allUsers);
      console.log(data.data.allUsers);
    },
    retry: false
  });

  useEffect(()=> {
    const authToken = sessionStorage.getItem("drpToken");
    setAuthToken(authToken);
    console.log(authToken);
  }, [])

  useEffect(()=> {
    console.log(authToken);
    if(authToken) {
      result.refetch().then(
        data=> {
        console.log(data);
      }).catch(
        error=> {
        console.log(error);
      });
    }
  }, [authToken])

  return (
    <>
      <Head>
        <title>home | Recruitment Portal</title>
        <meta name="description" content="dumela's recruitment portal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <header>
        <Navbar title="Recruitment Portal" />
        <div className={homeStyles.headerSearch}>
          <Searchbar />
        </div>
      </header>
      <main className={homeStyles.main}>
        <HomeActionPanel />
        <UserList allUsers={allUsers} />
      </main>
    </>
  )
}
