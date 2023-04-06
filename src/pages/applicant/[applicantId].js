import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import addApplicantStyles from "@/styles/AddApplicant.module.css";
import applicantDetailStyles from "@/styles/applicantDetails.module.css";
import { getApplicantData, useEditApplicant, useDeleteApplicant } from "@/custom-hooks/useApplicantDetail";

export default function ApplicantDetails() {
  const router = useRouter()
  const { applicantId } = router.query
  const [ applicantData, setApplicantData ] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    country: '',
    state: '',
    city: '',
    jobTitle: '',
    level: '',
    rate: '',
    status: '',
    outsourceRate: '',
  });
  const [ editStatus, setEditStatus ] = useState(true);

  const [ showJobSuggestion, setShowJobSuggestion ] = useState(false);
  const [ showLevelDropdown, setShowLevelDropdown ] = useState(false);
  const [ showStatusDropdown, setShowStatusDropdown ] = useState(false);

  const [ levelInput, setLevelInput ] = useState("");
  const [ statusInput, setStatusInput ] = useState("");

  const { data, error } = useQuery({
    queryKey: ["applicantId", applicantId],
    queryFn: getApplicantData,
    refetchOnWindowFocus: false,
    enabled: true,
    //throwOnError: true,
    retry: 2,
    onSuccess: ()=> setApplicantData(data),
    onError: ()=> {
      console.log("error");
      console.log("error", error);
    }
  }).isSuccess
  const editApplicant = useEditApplicant();
  const deleteApplicant = useDeleteApplicant();

  useEffect(()=> {
    setShowJobSuggestion(false);
    setShowLevelDropdown(false);
    setShowStatusDropdown(false);
  }, [editStatus])

  return (
    <>
      <Head>
        <title>Add Applicant | Recruitment Portal</title>
        <meta name="description" content="dumela's recruitment portal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <header>
        <Navbar title="New Applicant" />
      </header>

      <main>
        {
          (!applicantData) ?
            <section>
              <button
                onClick={
                  ()=> editApplicant.mutate({
                    applicantId,
                    applicantData: {"title": "emmo"}
                  })
                }
              >
                click me
              </button>
              <p>Post: {applicantId}{" "} {JSON.stringify(applicantData)}</p>
            </section>
          : null
        }
        <div className={addApplicantStyles.addPageContainer}>
          <section className={addApplicantStyles.addFormContainer}>
            <Link className={addApplicantStyles.goBackBtn} href="/" title="go back to the homepage">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path
                  d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
              </svg>
              <span>Back</span>
            </Link>
            <div className={applicantDetailStyles.applicantControls}>
              <button
                className={
                  `
                    ${applicantDetailStyles.viewApplicantBtn} 
                    ${applicantDetailStyles.initialBtn} 
                    ${!editStatus ? applicantDetailStyles.activeBtn : ""}
                  `
                }
                onClick={()=> setEditStatus(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path
                    d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z" />
                </svg>
                <span>View</span>
              </button>
              <button
                className={
                  `
                    ${applicantDetailStyles.updateApplicantBtn} 
                    ${applicantDetailStyles.initialBtn} 
                    ${editStatus ? applicantDetailStyles.activeBtn : ""}
                  `
                }
                onClick={()=> setEditStatus(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                </svg>
                <span>Update</span>
              </button>
              <button
                className={applicantDetailStyles.deleteApplicantBtn}
                onClick={()=> deleteApplicant.mutate(applicantId)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path
                    d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
                <span>Delete</span>
              </button>
            </div>
            <form
              onSubmit={
                (e)=> {
                  e.preventDefault();
                  let formData = new FormData(e.target);
                  editApplicant.mutate(
                    {applicantId, applicantData: formData},
                    {
                      onSuccess: ()=> {
                        router.push("/");
                      }
                    }
                  );
                }
              }
            >
              <div className={addApplicantStyles.addFormContent}>
                <div>
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="input first name"
                    maxLength="50"
                    pattern="[a-zA-Z]*"
                    required
                    disabled={!editStatus}
                    value={!editStatus ? applicantData.firstName : null}
                  />
                </div>
                <div>
                  <label htmlFor="middleName">Middle Name</label>
                  <input
                    id="middleName"
                    name="middleName"
                    type="text"
                    placeholder="input middle name"
                    disabled={!editStatus}
                    value={!editStatus ? applicantData.middleName : null}
                  />
                </div>
                <div>
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="input last name"
                    required
                    disabled={!editStatus}
                    value={!editStatus ? applicantData.lastName : null}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="input email address"
                    required
                    disabled={!editStatus}
                    value={!editStatus ? applicantData.email : null}
                  />
                </div>
                <div>
                  <label htmlFor="country">Country *</label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    placeholder="input country"
                    required
                    disabled={!editStatus}
                    value={!editStatus ? applicantData.country : null}
                  />
                </div>
                <div>
                  <label htmlFor="state">State *</label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    placeholder="input state"
                    required
                    disabled={!editStatus}
                    value={!editStatus ? applicantData.state : null}
                  />
                </div>
                <div>
                  <label htmlFor="city">City *</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="input city"
                    required
                    disabled={!editStatus}
                    value={!editStatus ? applicantData.city : null}
                  />
                </div>
                <div className={addApplicantStyles.jobTitle}>
                  <label htmlFor="jobTitle">Job Title *</label>
                  <div className={addApplicantStyles.selectOption}>
                    <input
                      id="jobTitle"
                      name="jobTitle"
                      type="text"
                      placeholder="input job title"
                      required
                      disabled={!editStatus}
                      value={!editStatus ? applicantData.jobTitle : null}
                    />
                    <ul
                      className={`
                        ${addApplicantStyles.optionDropdown}
                        ${showJobSuggestion ? addApplicantStyles.showDropdown : ""}
                      `}
                    >
                      <li id="suggestedOption"></li>
                    </ul>
                  </div>
                </div>
                <div>
                  <label htmlFor="level">Level *</label>
                  <div className={addApplicantStyles.selectOption}>
                    <input
                      id="level"
                      name="level"
                      type="text"
                      placeholder="input level"
                      required
                      readOnly
                      value={!editStatus ? applicantData.level : levelInput}
                    />
                    <button
                      type="button"
                      className={
                        `
                          ${addApplicantStyles.selectIcon} 
                          ${(!editStatus) ? applicantDetailStyles.hideElement : ""}
                        `
                      }
                      onClick={()=> setShowLevelDropdown(!showLevelDropdown)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path
                          d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                      </svg>
                    </button>
                    <ul
                      className={`
                        ${addApplicantStyles.optionDropdown} 
                        ${addApplicantStyles.levelDropdown} 
                        ${showLevelDropdown ? addApplicantStyles.showDropdown : ""}
                      `}
                    >
                      <li onClick={()=> setLevelInput("Entry")}>Entry</li>
                      <li onClick={()=> setLevelInput("Junior")}>Junior</li>
                      <li onClick={()=> setLevelInput("Intermediate")}>Intermediate</li>
                      <li onClick={()=> setLevelInput("Senior")}>Senior</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <label htmlFor="resume">Resume *</label>
                  {(editStatus) ?
                    <input
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf, .doc. .docx"
                      required
                    /> :
                    <div className={applicantDetailStyles.resumeBtnCont}>
                      <button
                        type="button"
                        className={applicantDetailStyles.initialBtn}
                      >
                        <a
                          href="#"
                          target="_blank"
                          title="go to ${data.resume_link}"
                        >
                          view
                        </a>
                      </button>
                      <button
                        type="button"
                        className={applicantDetailStyles.initialBtn}
                      >
                        download
                      </button>
                    </div>
                  }
                </div>
                <div>
                  <label htmlFor="rate">Rate *</label>
                  <input
                    id="rate"
                    name="rate"
                    type="number"
                    placeholder="input rate"
                    required
                    disabled={!editStatus}
                    value={!editStatus ? applicantData.rate : null}
                  />
                </div>
                <div>
                  <label htmlFor="status">Status *</label>
                  <div className={addApplicantStyles.selectOption}>
                    <input
                      id="status"
                      type="text"
                      placeholder="input status"
                      required
                      readOnly
                      value={!editStatus ? applicantData.status : statusInput}
                    />
                    <button
                      type="button"
                      className={
                        `
                          ${addApplicantStyles.selectIcon} 
                          ${(!editStatus) ? applicantDetailStyles.hideElement : ""}
                        `
                      }
                      onClick={()=> setShowStatusDropdown(!showStatusDropdown)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path
                          d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                      </svg>
                    </button>
                    <ul
                      className={`
                        ${addApplicantStyles.optionDropdown} 
                        ${ showStatusDropdown ? addApplicantStyles.showDropdown : "" }
                      `}
                    >
                      <li
                        onClick={()=> setStatusInput("Interviewed (Selected)")}
                      >
                        Interviewed (Selected)
                      </li>
                      <li
                        onClick={()=> setStatusInput("Interviewed (Not Selected)")}
                      >
                        Interviewed (Not Selected)
                      </li>
                      <li
                        onClick={()=> setStatusInput("Not Interviewed")}
                      >
                        Not Interviewed
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <label htmlFor="outsourceRate">Outsource Rate *</label>
                  <input
                    id="outsourceRate"
                    name="outsourceRate"
                    type="number"
                    placeholder="input outsource rate"
                    required
                    disabled={!editStatus}
                    value={!editStatus ? applicantData.outsourceRate : null}
                  />
                </div>
              </div>
              <button
                className={
                  `
                    ${addApplicantStyles.submitBtn} 
                    ${(!editStatus) ? applicantDetailStyles.hideElement : ""}
                  `
                }
                type="submit"
              >
                Submit
              </button>
            </form>
          </section>
        </div>
      </main>
    </>
  )
}
