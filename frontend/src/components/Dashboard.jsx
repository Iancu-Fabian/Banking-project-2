
import styles from "../styles/Dashboard.module.css";
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns';


export const Dashboard = () => {
  const [clientsTotal, setclientsTotal] = useState([]);
  const [loansTotal, setloansTotal] = useState([]);
  const [loanAmountTotal, setloanAmountTotal] = useState([]);
  const [latestLoans, setlatestLoans] = useState([]);
  const [biggestLoans, setbiggestLoans] = useState([]);


  const fetchclientsTotal = async () => {
      const response = await fetch('http://localhost:3000/clients_total', {mode:'cors'});
      const data = await response.json();
      setclientsTotal(data[0]["COUNT(*)"]);
  };

  const fetchloansTotal = async () => {
      const response = await fetch('http://localhost:3000/loans_total', {mode:'cors'});
      const data = await response.json();
      setloansTotal(data[0]["COUNT(*)"]);
  };

  const fetchloanAmountTotal = async () => {
      const response = await fetch('http://localhost:3000/total_loan_amount', {mode:'cors'});
      const data = await response.json();
      setloanAmountTotal(data[0].total_sum);
  };

  const fetchlatestLoans = async () => {
    const response = await fetch('http://localhost:3000/latest_loans', {mode:'cors'});
    const data = await response.json();
    setlatestLoans(data);
};

const fetchbiggestLoans = async () => {
  const response = await fetch('http://localhost:3000/biggest_loans', {mode:'cors'});
  const data = await response.json();
  setbiggestLoans(data);
};


  useEffect(() => {
    fetchclientsTotal();
    fetchloansTotal();
    fetchloanAmountTotal();
    fetchlatestLoans();
    fetchbiggestLoans ();
  }, []);

  return (

    <div className={styles.container}>
          <div className={styles.activityContainer1}>
            <span className={styles.title}>Activity Overview</span>
            
            <div className={styles.svgRow1}>
                  
                <svg className={styles.image} width="125" height="106" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
                <g className="layer">
                <rect fill="#A4FFBD" height="106" id="svg_1" rx="8" transform="matrix(1 0 0 1 0 0)" width="124" x="0.05"/>
                <path d="m67.79,37.5c0.64,0 1.26,-0.22 1.8,-0.63c0.53,-0.41 0.94,-1 1.19,-1.69c0.24,-0.68 0.31,-1.44 0.18,-2.16c-0.12,-0.73 -0.43,-1.4 -0.88,-1.92c-0.46,-0.53 -1.03,-0.88 -1.66,-1.03c-0.63,-0.14 -1.28,-0.07 -1.87,0.21c-0.6,0.29 -1.1,0.77 -1.46,1.39c-0.35,0.61 -0.54,1.34 -0.54,2.08c-0.01,0.49 0.08,0.98 0.24,1.44c0.16,0.45 0.4,0.87 0.7,1.21c0.3,0.35 0.66,0.63 1.05,0.82c0.4,0.18 0.82,0.28 1.25,0.28zm-9.72,-1.5c0.77,0 1.52,-0.27 2.16,-0.76c0.64,-0.49 1.14,-1.2 1.43,-2.02c0.29,-0.82 0.37,-1.73 0.22,-2.6c-0.15,-0.87 -0.52,-1.67 -1.06,-2.3c-0.55,-0.63 -1.24,-1.06 -1.99,-1.23c-0.76,-0.18 -1.54,-0.09 -2.25,0.25c-0.71,0.34 -1.31,0.92 -1.74,1.66c-0.43,0.74 -0.66,1.61 -0.66,2.5c0,0.59 0.1,1.18 0.29,1.72c0.2,0.55 0.48,1.05 0.85,1.47c0.36,0.42 0.79,0.75 1.26,0.97c0.47,0.23 0.98,0.34 1.49,0.34zm9.72,4.5c-2.38,0 -7.13,1.38 -7.13,4.12l0,3.38l14.25,0l0,-3.38c0,-2.74 -4.75,-4.12 -7.12,-4.12zm-9.72,-1.5c-3.02,0 -9.07,1.75 -9.07,5.25l0,3.75l9.07,0l0,-3.38c0.04,-1.11 0.34,-2.19 0.89,-3.11c0.54,-0.92 1.3,-1.65 2.18,-2.09c-1.01,-0.26 -2.04,-0.4 -3.07,-0.42z" fill="#2D421E" id="svg_2"/>
                <text fill="#000000" fontFamily="Sans-serif" fontSize="18" id="svg_3" stroke="#000000" strokeWidth="0" textAnchor="middle" x="62.5" xmlSpace="preserve" y="85">Clients</text>
                <text x="58" y="68" fill="#4B4403">{clientsTotal}</text>
                </g>
                </svg>

                
                <svg className={styles.image} width="125" height="106" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
                <g className="layer">
                <title>Layer 1</title>
                <rect fill="#A4D2FF" height="106" id="svg_1" rx="8" width="124" x="0.81"/>
                <path d="m62.47,47.99l7.99,0c0.39,0 0.77,-0.15 1.05,-0.44c0.28,-0.28 0.44,-0.66 0.44,-1.05l0,-21c0,-0.2 -0.04,-0.4 -0.11,-0.58c-0.08,-0.18 -0.19,-0.34 -0.33,-0.48c-0.14,-0.14 -0.3,-0.25 -0.48,-0.33c-0.18,-0.07 -0.38,-0.11 -0.57,-0.11l-10.64,0l0,0.49c0,0.06 0,0.11 0,0.16l0,4.1c0,0.56 -0.22,1.09 -0.61,1.49c-0.39,0.39 -0.93,0.61 -1.48,0.61l-4.08,0c-0.05,0 -0.09,0 -0.13,0l-0.52,0l0,15.65c0,0.4 0.16,0.78 0.44,1.06c0.28,0.28 0.65,0.44 1.05,0.44l7.99,0l-0.01,-0.01zm0.3,-5.08l-5.2,0c-0.19,0 -0.37,-0.07 -0.5,-0.2c-0.13,-0.14 -0.21,-0.32 -0.21,-0.5c0,-0.19 0.08,-0.37 0.21,-0.5c0.13,-0.14 0.31,-0.21 0.5,-0.21l5.21,0c0.18,0 0.36,0.07 0.49,0.21c0.14,0.13 0.21,0.31 0.21,0.5c0,0.18 -0.07,0.36 -0.21,0.5c-0.13,0.13 -0.31,0.2 -0.49,0.2l-0.01,0zm5.21,-3.6l-10.41,0c-0.19,0 -0.37,-0.08 -0.5,-0.21c-0.13,-0.13 -0.21,-0.31 -0.21,-0.5c0,-0.19 0.08,-0.37 0.21,-0.5c0.13,-0.13 0.31,-0.21 0.5,-0.21l10.41,0c0.19,0 0.37,0.08 0.5,0.21c0.13,0.13 0.21,0.31 0.21,0.5c0,0.19 -0.08,0.37 -0.21,0.5c-0.13,0.13 -0.31,0.21 -0.5,0.21l0,0zm-10.41,-5.24l10.41,0c0.19,0 0.37,0.07 0.5,0.2c0.13,0.14 0.21,0.32 0.21,0.5c0,0.19 -0.08,0.37 -0.21,0.5c-0.13,0.13 -0.31,0.21 -0.5,0.21l-10.41,0c-0.19,0 -0.37,-0.08 -0.5,-0.21c-0.13,-0.13 -0.21,-0.31 -0.21,-0.5c0,-0.18 0.08,-0.36 0.21,-0.5c0.13,-0.13 0.31,-0.2 0.5,-0.2z" fill="#374858" id="svg_2"/>
                <path d="m53.65,30l4.09,0c0.33,0 0.64,-0.13 0.87,-0.36c0.23,-0.24 0.36,-0.55 0.37,-0.88l0,-4.11c0,-0.08 -0.02,-0.17 -0.05,-0.24c-0.03,-0.08 -0.08,-0.15 -0.14,-0.21c-0.06,-0.05 -0.13,-0.1 -0.2,-0.13c-0.08,-0.03 -0.16,-0.05 -0.24,-0.05c-0.08,0 -0.17,0.02 -0.24,0.05c-0.08,0.03 -0.15,0.08 -0.2,0.14l-4.71,4.72c-0.09,0.09 -0.15,0.2 -0.17,0.32c-0.03,0.13 -0.02,0.25 0.03,0.37c0.05,0.11 0.13,0.21 0.24,0.28c0.1,0.07 0.22,0.11 0.35,0.1z" fill="#374858" id="svg_3"/>
                <text fill="#000000" fontFamily="Sans-serif" fontSize="18" id="svg_4" strokeWidth="0" textAnchor="middle" x="63.5" xmlSpace="preserve" y="93">Loans</text>
                <text x="58" y="71" fill="#4B4403">{loansTotal}</text>
                </g>
                </svg>
              
                  
                
            
                <svg className={styles.image} width="125" height="106" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
                <defs>
                <clipPath id="clip0_1_2928">
                <rect fill="white" height="24" id="svg_1" transform="translate(51 24)" width="23.92"/>
                </clipPath>
                </defs>
                <g className="layer">
                <rect fill="#FFF598" height="106" id="svg_2" rx="8" width="124" x="0.81"/>
                <g id="svg_3">
                <path d="m66.95,33l0,-2l-7.98,0l0,2c-1.32,0 -2.58,0.53 -3.52,1.47c-0.93,0.93 -1.46,2.2 -1.46,3.53l0,5c0,1.33 0.53,2.6 1.46,3.53c0.94,0.94 2.2,1.47 3.52,1.47l7.98,0c1.32,0 2.58,-0.53 3.52,-1.47c0.93,-0.93 1.46,-2.2 1.46,-3.53l0,-5c0,-1.33 -0.53,-2.6 -1.46,-3.53c-0.94,-0.94 -2.2,-1.47 -3.52,-1.47zm-1,8l-1.99,0l0,2c0,0.27 -0.11,0.52 -0.3,0.71c-0.18,0.18 -0.44,0.29 -0.7,0.29c-0.27,0 -0.52,-0.11 -0.71,-0.29c-0.18,-0.19 -0.29,-0.44 -0.29,-0.71l0,-2l-1.99,0c-0.27,0 -0.52,-0.11 -0.71,-0.29c-0.18,-0.19 -0.29,-0.44 -0.29,-0.71c0,-0.27 0.11,-0.52 0.29,-0.71c0.19,-0.18 0.44,-0.29 0.71,-0.29l1.99,0l0,-2c0,-0.27 0.11,-0.52 0.29,-0.71c0.19,-0.18 0.44,-0.29 0.71,-0.29c0.26,0 0.52,0.11 0.7,0.29c0.19,0.19 0.3,0.44 0.3,0.71l0,2l1.99,0c0.26,0 0.52,0.11 0.7,0.29c0.19,0.19 0.3,0.44 0.3,0.71c0,0.27 -0.11,0.52 -0.3,0.71c-0.18,0.18 -0.44,0.29 -0.7,0.29zm0.5,-12l-6.98,0c-0.66,0 -1.29,-0.26 -1.76,-0.73c-0.47,-0.47 -0.73,-1.11 -0.73,-1.77c0,-0.66 0.26,-1.3 0.73,-1.77c0.47,-0.47 1.1,-0.73 1.76,-0.73l6.98,0c0.66,0 1.29,0.26 1.76,0.73c0.47,0.47 0.73,1.11 0.73,1.77c0,0.66 -0.26,1.3 -0.73,1.77c-0.47,0.47 -1.1,0.73 -1.76,0.73z" fill="#4B4403" id="svg_4"/>
                </g>
                <text fill="#000000" fontFamily="Sans-serif" fontSize="18" id="svg_5" strokeWidth="0" textAnchor="middle" x="62.5" xmlSpace="preserve" y="96">Total loaned</text>
                <text x="32" y="71" fill="#4B4403">{loanAmountTotal}$</text>
                </g>
                </svg>
                
                  

           

        </div>
      </div>
      <div className={styles.bigContainer}>
      <div className={styles.activityContainer2}>

        <span className={styles.title}>Latest Loans</span>

         <div className={styles.tableWrapper}>
          <table className={`table table-hover ${styles.table}`} id="table1">
            <thead>
              <tr>
                <th scope="col">Amount</th>
                <th scope="col">Client Name</th>
                <th scope="col">Start Date</th>
              </tr>
            </thead>
            <tbody>
            {  latestLoans.map((app, index) => (
                <tr key={index}>
                  <th scope="row">{app.amount}</th>
                  <td>{app.last_name + ' ' + app.first_name}</td>
                  <td>{format(new Date(app.start_date), 'MMMM dd, yyyy')}</td>
                </tr>
              )) }
            </tbody>   
          </table>
        </div>
      </div>
        <div className={styles.activityContainer3}>
          
          
          
        <span className={styles.title2}>Biggest loans taken</span>
        <ul className={styles.biggestLoansList}>
          {biggestLoans.map((loan, index) => (
            <li key={index} className={styles.items}>
              <div className={styles.loan_owner_name}>
                {loan.first_name} {loan.last_name}
              </div>
              <div className={styles.amount}>
                ${loan.amount} loan
              </div>
            </li>
          ))}
        </ul>
        </div>
        </div>
    </div>
  );
};

   