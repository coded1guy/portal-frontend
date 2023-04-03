import searchbarStyles from "@/styles/components/Searchbar.module.css"

const Searchbar = () => {
  return (
    <form className={searchbarStyles.searchBar}>
      <input type="search" placeholder="Search by Candidate or Role" required/>
      <button type="submit">search</button>
    </form>
  )
}

export default Searchbar;