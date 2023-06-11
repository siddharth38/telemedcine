import React  from "react";
import Header from "./dataEntry/Header/Header";
import Heading from "./dataEntry/heading/Heading";

import io from "socket.io-client";
// console.log(`persona : io = ${io}, io.parsed = ${io.parsed}, io.path = ${io.path}, io.opts = ${io.opts}`)
// const socket = io('http://localhost:3000/doctor/persona', {transports: ["http"]})

const socket = io.connect("ws://localhost:3002", {
  path: "/doctor/persona",
  transports: ["websocket"],
  // allowedHeaders: ["my-custom-header"],
  // credentials: true
  // query: {
  //   // _id,
  //   // type: 'doctor'
  // }
});
// console.log(`persona : socket = ${socket}. socket.keys = ${socket.keys}`)
// console.log(`persona : io = ${io}, io.parsed = ${io.parsed}, io.path = ${io.path}, io.opts = ${io.opts}`)

socket.on("connect_error", err => {
  console.log('persona.connect_error. err instanceof Error = ', err); // true
  console.log('persona.connect_error. err.message = ', err.message); // not authorized
  console.log('persona.connect_error. err.data = ', err.data); // { content: "Please retry later" }
});

export default class Persona extends React.Component {
  state = {
    dat : [],
    name1 : "",
    Statement1 : "",
    next1 : "",
    name2 : "",
    Statement2 : "",
    next2 : "",
    a : false,
    b : false,
    val : 300,
    inputRef : { current:null },
    firstDivRef : { current:null },
    secondDivRef : { current:null }
  }

  handleScrollFirst = (scroll) => {
    this.state.secondDivRef.current.scrollTop = scroll.target.scrollTop;
  };

  handleScrollSecond = (scroll) => {
    this.state.firstDivRef.current.scrollTop = scroll.target.scrollTop;
  };

  handle = () => {
    console.log("handleA");
    let { a } = this.state
    this.setState({a: !a})
  };

  handleB = () => {
    console.log("handleB");
    let { b } = this.state
    this.setState({b: !b})
  }

  componentDidMount() {
    let { val, dat } = this.state
    socket.on("send_last_val", async (index_obj, data) => {
      dat = data;
      if (index_obj === null) {
        val = 300
      } else {
        val = index_obj._id + 1
      }
      this.setState({ val, dat })
    });
  }

  componentWillUnmount() {
    let { val, dat } = this.state
    socket.on("send_last_val", async (index_obj, data) => {
      dat = data;
      if (index_obj === null) {
        val = 300
      } else {
        val = index_obj._id + 1
      }
      this.setState({ val, dat })
    });
  }

  render() {
    const {
      dat, name1, Statement1, next1, name2, Statement2, next2, a, /*b,*/ val, inputRef, firstDivRef, secondDivRef} = this.state

    console.log('persona.render : dat = ', dat)
    return (
      <div className="BotBuilder">
        <div className="bb-header">
          <Header handle={this.handle} className={"bb-head"}/>
        </div>

        {/*------------------------------ */}
        <div className="BotBuilder" style={{ display: "flex", height: "70vh", overflow: "hidden" }}>
          <div className="main_pop">
            {a && (
              <div className="main_main" onScroll={this.handleScrollFirst} ref={firstDivRef} style={{ overflow: "scroll" }}>
                <div className="row_main" style={{ height: "10vh" }}>
                  <Heading />
                  <div className="map">
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
                  value={name1}
                  onChange={(event) => this.setState({ name1: event.target.value })}
                  ref={inputRef}
                  autoFocus
                />
              </div>
              <div className="i3">
                <input
                  placeholder="Statement"
                  type="text"
                  value={Statement1}
                  onChange={(event) => this.setState({Statement1:event.target.value})}
                />
              </div>
              <div className="i4">
                <input
                  placeholder="Next"
                  type="text"
                  value={next1}
                  onChange={(event) => this.setState({next1:event.target.value})}
                />
              </div>
              <div className="i5">
                <input
                  placeholder="Option's Name"
                  type="text"
                  value={name2}
                  onChange={(event) => this.setState({name2:event.target.value})}
                />
              </div>
              <div className="i6">
                <input
                  placeholder="Option's Statement"
                  type="text"
                  value={Statement2}
                  onChange={(event) => this.setState({Statement2:event.target.value})}
                />
              </div>
              <div className="i7">
                <input
                  placeholder="Option's Next"
                  type="text"
                  value={next2}
                  onChange={(event) => this.setState({next2: event.target.value})}
                />
              </div>
            </div>
            <div>
              <button onClick={(event)=>{
                const{ name1, name2, next1, next2, Statement1, Statement2 } = this.state
                const msg = { name1: name1, Statement1: Statement1, next1: next1,
                  name2: name2, Statement2: Statement2, next2: next2,
                };
                socket.emit("sending", msg);
                console.log("socket has emitted on submit")
                this.setState({name1, name2, next1, next2, Statement1, Statement2})
                inputRef.current.focus();
              }}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}