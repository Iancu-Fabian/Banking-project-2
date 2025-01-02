import { Navbar } from '../components/Navbar'; 
import { ClientLoansList } from '../components/ClientLoansList';
import styles from "../App.module.css"

function ClientLoansPage() {
  
    return (
      <div className={styles.container}>
        <Navbar />
        <div className={styles.container2}>
          <h1 className={styles.title}> Client Loans  </h1>
          <ClientLoansList/>
        </div>
      </div>
    )
  }

  export default ClientLoansPage;