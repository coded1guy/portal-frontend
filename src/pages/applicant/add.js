import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import addApplicantStyles from "@/styles/AddApplicant.module.css";

import useCreateApplicant from "@/functions/postApplicant";

import Navbar from "@/components/Navbar";

export default function AddApplicant() {
  const router = useRouter();

  const [ showJobSuggestion, setShowJobSuggestion ] = useState(false);
  const [ showLevelDropdown, setShowLevelDropdown ] = useState(false);
  const [ showStatusDropdown, setShowStatusDropdown ] = useState(false);

  const [ levelInput, setLevelInput ] = useState("");
  const [ statusInput, setStatusInput ] = useState("");

  const { mutate } = useCreateApplicant();

  const handleCreateApplicant = (formData)=> {
    mutate(
      formData,
      {
        onSuccess: (data)=> {
          console.log(data);
          //router.push("/");
        },
        onError: (error)=> {
          console.log(error);
        }
      }
    );
  }
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
        <div className={addApplicantStyles.addPageContainer}>
          <section className={addApplicantStyles.addFormContainer}>
            <Link className={addApplicantStyles.goBackBtn} href="/" title="go back to the homepage">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path
                  d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
              </svg>
              <span>Back</span>
            </Link>
            <form
              onSubmit={
                (e)=> {
                  e.preventDefault();
                  let formData = new FormData(e.target);
                  handleCreateApplicant(formData);
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
                  />
                </div>
                <div>
                  <label htmlFor="middleName">Middle Name</label>
                  <input
                    id="middleName"
                    name="middleName"
                    type="text"
                    placeholder="input middle name"
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
                      value={levelInput}
                      required
                      readOnly
                    />
                    <button
                      type="button"
                      className={addApplicantStyles.selectIcon}
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
                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf, .doc. .docx"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="rate">Rate *</label>
                  <input
                    id="rate"
                    name="rate"
                    type="number"
                    placeholder="input rate"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="status">Status *</label>
                  <div className={addApplicantStyles.selectOption}>
                    <input
                      id="status"
                      type="text"
                      placeholder="input status"
                      value={statusInput}
                      required
                      readOnly
                    />
                    <button
                      type="button"
                      className={addApplicantStyles.selectIcon}
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
                  />
                </div>
              </div>
              <button className={addApplicantStyles.submitBtn} type="submit">
                Submit
              </button>
            </form>
          </section>
        </div>
      </main>
    </>
  )
}
