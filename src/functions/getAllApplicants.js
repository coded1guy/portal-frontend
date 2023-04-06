import axios from "axios";
const getAllApplicants = async () => {
  return await axios.get(`https://recruitment-portal-backend-production.up.railway.app/admin/getAllUsers`);
};

export default getAllApplicants;