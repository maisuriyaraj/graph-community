import {React} from 'react';
import BarLoader from "react-spinners/BarLoader";

const override = {
    display: "block",
    // margin: "0 auto",
    borderColor: "red",
  };

export default function Loader(props) {
  return (
    <BarLoader color='red' cssOverride={override} height={'4px'} width={'100%'} loading={props.isLoading}   aria-label="Loading Spinner"
    data-testid="loader" />
  )
}
