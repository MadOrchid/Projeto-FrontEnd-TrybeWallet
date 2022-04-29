import React from 'react';
import ExpenseTable from '../components/ExpenseTable';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <ExpenseTable />
      </>
    );
  }
}
export default Wallet;
