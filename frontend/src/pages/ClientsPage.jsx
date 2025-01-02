import { Navbar } from '../components/Navbar'; 
import { ClientList } from '../components/ClientList';
import styles from "../App.module.css"

function ClientsPage() {
  
    return (
      <div className={styles.container}>
        <Navbar />
        <div className={styles.container2}>
          <h1 className={styles.title}> Clients  </h1>
          <ClientList/>
        </div>
      </div>
    )
  }

  export default ClientsPage;