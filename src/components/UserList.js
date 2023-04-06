import Link from "next/link";
import userListStyle from "@/styles/components/UserList.module.css";

const UserList = ({ allUsers })=> {
  return (
    <section className={userListStyle.userCont}>
      <div>
        <div>
          {(allUsers && allUsers.length > 0) ?
            <ul>
              <li className={`${userListStyle.userList} ${userListStyle.userHeading}`}>
                <ul>
                  <li className={userListStyle.sn}>S/N</li>
                  <li className={userListStyle.name}>Name</li>
                  <li className={userListStyle.country}>Country</li>
                  <li className={userListStyle.jobTitle}>Job Title</li>
                  <li className={userListStyle.status}>Status</li>
                </ul>
              </li>
              {
                allUsers.map(user => {
                  return <li key={user.id} className={`${userListStyle.userList} ${userListStyle.userData}`}>
                    <Link href={`/applicant/${user.id | null}`}>
                      <ul>
                        <li className={userListStyle.sn}>{user.id}</li>
                        <li>{user.firstName} {user.lastName}</li>
                        <li>{user.country}</li>
                        <li>{user.jobTitle}</li>
                        <li>{user.status}</li>
                      </ul>
                    </Link>
                  </li>;
                })
              }
            </ul>:
            <ul>
              <li className={`${userListStyle.userList} ${userListStyle.userHeading}`}> No user in the database </li>
            </ul>
          }
        </div>
      </div>
    </section>
  )
}
export default UserList;