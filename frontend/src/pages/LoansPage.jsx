import { Navbar } from '../components/Navbar'; 
import { LoansList } from '../components/LoansList';
import styles from "../App.module.css"

function LoansPage() {
  
    return (
      <div className={styles.container}>
        <Navbar />
        <div className={styles.container2}>
          <h1 className={styles.title}> Loans  </h1>
          <LoansList/>
        </div>
      </div>
    )
  }

  export default LoansPage;