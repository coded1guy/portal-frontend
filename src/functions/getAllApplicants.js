const getAllApplicants = async () => {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  const res = await fetch(
    `https://recruitment-portal-backend-production.up.railway.app/admin/getAllUsers`
    , requestOptions
  );

  if (!res.ok) {
    throw new Error(
      `error getting all the user from the database`
    );
  }

  return res.text();
};

export default getAllApplicants;