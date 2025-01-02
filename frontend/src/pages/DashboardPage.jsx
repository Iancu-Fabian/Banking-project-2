import { Dashboard } from "../components/Dashboard"
import styles from "../App.module.css"
import { Navbar } from "../components/Navbar"


function DashboardPage() {
  
    return (
      <div className={styles.container}>
        <Navbar />
        <div className={styles.container2}>
          <h1 className={styles.title}> Dashboard  </h1>
          <Dashboard />
         
        </div>
      </div>
    )
  }
  export default DashboardPage;