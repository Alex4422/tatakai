import { connect } from 'react-redux';

import App from '../components/App';
import {newInstance, changeField, submitValue} from '../actions/contract';


const mapStateToProps = ({contractStore}: any) => {
const  {web3, accounts, contract, storageValue, isLoading, inputValue} = contractStore
   return ({
    web3,
    accounts,
    contract,
    storageValue,
    isLoading,
    inputValue,
  })
}

const mapDispatchToProps = (dispatch:any) => ({
  newInstance: () => {
    dispatch(newInstance());
  },
  changeField: (value: number, field: string) => {
    dispatch(changeField(value,field));
  },
  submitValue: () => {
    dispatch(submitValue());
  }
})

// appel a connect et export
export default connect(mapStateToProps,mapDispatchToProps)(App);