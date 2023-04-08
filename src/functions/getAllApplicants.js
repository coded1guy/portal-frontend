import axios from "axios";

const getAllApplicants = async ({ queryKey }) => {
  const drpToken = queryKey[1];
  return await axios.get(
    `https://recruitment-portal-backend-production.up.railway.app/admin/getAllUsers`,
    {
      headers: {
        Authorization: `Bearer ${drpToken}`
      }
    });
};

export default getAllApplicants;
