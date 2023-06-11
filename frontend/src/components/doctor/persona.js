import React, { useEffect, useRef, useState } from "react";
import Header from "./dataEntry/Header/Header";
import Heading from "./dataEntry/heading/Heading";

// const express = require("express");
// const app = express();
// const { Server } = require("socket.io");
// const cors = require("cors");
const client = require("socket.io-client");

export default class Persona extends React.Component {

  handleScrollFirst = (scroll) => {
    this.secondDivRef.current.scrollTop = scroll.target.scrollTop;
  };

  handleScrollSecond = (scroll) => {
    this.firstDivRef.current.scrollTop = scroll.target.scrollTop;
  };

  handle = () => {
    console.log("jjhjbhjjh_jnjksdfds");
    this.setA(!a);
  };

  // sendMessage = () => {
  //   const msg = {
  //     name1: name1,
  //     Statement1: Statement1,
  //     next1: next1,
  //     name2: name2,
  //     Statement2: Statement2,
  //     next2: next2,
  //   };
  //
  //   socket.emit("sending", msg);
  //   setName1(" ");
  //   setName2("");
  //   setNext1("");
  //   setNext2("");
  //   setStatement2("");
  //   setStatement1("");
  //   inputRef.current.focus();
  // };


  componentDidMount() {
  }

  componentWillUnmount() {
    const [val, setVal] = useState(300);
    useEffect(() => {
      socket.on("send_last_val", async (index_obj, data) => {
        this.setData(data);
        if (index_obj === null) {
          setVal(300);
        } else {
          setVal(index_obj._id + 1);
        }
      });
    }, []);
  }

  connect = () => {
    const { patientId } = this.state;

    this.setState({ requesting: true });

    // create socket based on environment - dev/prod
    this.socket = client("/", {
      path: "/doctor/persona",
      transports: ["websocket"],
      query: {
        // _id,
        // type: 'doctor'
      }
    });

  };

  render() {
    const [dat, setData] = useState([]);
    const [name1, setName1] = useState("");
    const [Statement1, setStatement1] = useState("");
    const [next1, setNext1] = useState("");
    const [name2, setName2] = useState("");
    const [Statement2, setStatement2] = useState("");
    const [next2, setNext2] = useState("");
    const [a, setA] = useState(false);
    const [b, setB] = useState(false);
    const inputRef = useRef();
    const firstDivRef = useRef();
    const secondDivRef = useRef();

    console.log('persona.render : dat = ', dat)
    return (
      <div className="App">
        <div className="header">
          <Header handle={this.handle} />
        </div>

        {/*------------------------------ */}
        <div
          className="App"
          style={{
            display: "flex",
            height: "70vh",
            overflow: "hidden"
          }}
        >
          <div className="main_pop">
            {a && (
              <div
                className="main_main"
                onScroll={this.handleScrollFirst}
                ref={firstDivRef}
                style={{

                  overflow: "scroll"
                }}
              >
                <div className="row_main" style={{ height: "10vh" }}>
                  <Heading />
                  <div className="map" style={{ height: "100vh" }}>
                    {dat.map((item) => (
                      <div className="del" key={item.id}>
                        <div>{item.name2}</div>
                        <div>{item.Statement2}</div>
                        <div>{item.next2}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className="field_row"
            onScroll={this.handleScrollSecond}
            ref={secondDivRef}
          >
            <div className="field">
              {dat.map((item) => (
                <div className="field_main">
                  <div className="f1">{item._id}</div>
                  <div className="f2">{item.name1}</div>
                  <div className="f3">{item.Statement1}</div>
                  <div className="f4">{item.next1}</div>
                  <div className="f5">ssd</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/*------------------------------ */}

        <div className="inp">
          <div className="main">
            <div className="inp">
              <div className="i1">
                {/* <input placeholder="Id" /> */}
                {val}
              </div>
              <div className="i2">
                <input
                  placeholder="Name"
                  value={this.name1}
                  onChange={(event) => setName1(event.target.value)}
                  ref={inputRef}
                  autoFocus
                />
              </div>
              <div className="i3">
                <input
                  placeholder="Statement"
                  type="text"
                  value={Statement1}
                  onChange={(event) => setStatement1(event.target.value)}
                />
              </div>
              <div className="i4">
                <input
                  placeholder="Next"
                  type="text"
                  value={next1}
                  onChange={(event) => setNext1(event.target.value)}
                />
              </div>
              <div className="i5">
                <input
                  placeholder="Option's Name"
                  type="text"
                  value={name2}
                  onChange={(event) => setName2(event.target.value)}
                />
              </div>
              <div className="i6">
                <input
                  placeholder="Option's Statement"
                  type="text"
                  value={Statement2}
                  onChange={(event) => setStatement2(event.target.value)}
                />
              </div>
              <div className="i7">
                <input
                  placeholder="Option's Next"
                  type="text"
                  value={next2}
                  onChange={(event) => setNext2(event.target.value)}
                />
              </div>
            </div>
            <div>
              <button onClick={this.sendMessage}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}