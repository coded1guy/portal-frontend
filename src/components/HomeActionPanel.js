import Link from "next/link";
import homeActionPanelStyles from "@/styles/components/HomeActionPanel.module.css";
const HomeActionPanel = () => {
  return (
    <div className={homeActionPanelStyles.homeActionPanel}>
      <Link href="/applicant/add" className={homeActionPanelStyles.addApplicantBtn}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
        </svg>
        <span>add new applicant</span>
      </Link>
    </div>
  )
}
export default HomeActionPanel;