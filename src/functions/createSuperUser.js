const createSuperUser = async ({ queryKey })=> {
  if(queryKey[1]["firstName"] && queryKey[1]["lastName"] && queryKey[1]["email"] && queryKey[1]["password"]) {
    let requestOptions = {
      method: 'PUT',
      redirect: 'follow',
      body: JSON.stringify(queryKey[1])
    };

    const res = await fetch(
      `https://recruitment-portal-backend-production.up.railway.app/admin/signup`
      , requestOptions
    );

    if (!res.ok) {
      throw new Error(
        `error creating super user`
      );
    }

    return res.text();
  }
}
export default createSuperUser;

