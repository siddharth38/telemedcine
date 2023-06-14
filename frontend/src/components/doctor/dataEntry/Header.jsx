import React,{useState} from "react";
// import "./Header.css";
import Rowdata from "./row_data/Row_Data";


function Header(props) {




  return (
    <>
      <div className="root-head">
        <div className="c1">Id</div>
        <div className="c2">Name</div>
        <div className="c3">Statement</div>
        <div className="c4">Next</div>
        <div className="c5" onClick={props.handle}>
          Options
        </div>
      </div>
    </>
  );
}

export default Header;
