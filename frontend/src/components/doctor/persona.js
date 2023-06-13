import React  from "react";
import Header from "./dataEntry/Header/Header";
import Heading from "./dataEntry/heading/Heading";

import io from "socket.io-client";
import {
  ID,
  LANG_ENGLISH,
  LANG_HINDI,
  NEXT_QUESTION,
  OPTION_VARIANT_NAME,
  OPTIONS,
  STATEMENT
} from "server/data/questions";
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
    messageData : [],
    id : "",
    statement : "",
    nextQuestion : "",
    name2 : "",
    Statement2 : "",
    next2 : "",
    a : false,
    b : false,
    messageId : 300,
    inputRef : { current:null },
    rootSheetRef : { current:null },
    level1SheetRef : { current:null }
  }

  handleLayerScroll = (scroll) => {
    if (scroll.target && this.state.level1SheetRef.current)
      this.state.level1SheetRef.current.scrollTop = scroll.target.scrollTop;
  };

  handleRootScroll = (scroll) => {
    if (scroll.target && this.state.rootSheetRef.current)
      this.state.rootSheetRef.current.scrollTop = scroll.target.scrollTop;
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
    let { messageId, messageData } = this.state
    socket.on("send_last_val", async (index_obj, data) => {
      messageData = data;
      if (index_obj === null) {
        messageId = 300
      } else {
        messageId = index_obj._id + 1
      }
      this.setState({ messageId: messageId, messageData: messageData })
    });
  }

  makeLayer = () => {

  }

  setOption = (item, key) => {
    console.log(item)
    let options = item[OPTIONS]
    if (!options)
      return
    let domContent = []
    console.log(`setOption options.length = ${options.length}`)
    for (let i=0; i<options.length; i++) {
      let option = options[i]
      console.log(`persona.setOptions : i = ${i}. option. = ${option}. Object.keys(option) = ${Object.keys(option)}`)
      if (option[STATEMENT]) {
        // if (typeof option[STATEMENT] === "string") {
        //   console.log(`persona : iterating through option statements : ${option[STATEMENT]}`)
        //   domContent.push(<div key={`${key}-${i}-${/*options[i][OPTION_VARIANT_NAME]*/""}`}>{option[STATEMENT]}</div>);
        // } else {
          console.log(`persona : iterating through option statements : ${option[STATEMENT]}`)
          domContent.push(<div
            key={`${key}-${i}-${/*options[i][OPTION_VARIANT_NAME]*/""}`}>
            {this.setOptionStatement(option, `${key}-${i}-${option[OPTION_VARIANT_NAME]}`)}</div>);
          // domContent.push(<div key={`${key}-${LANG_HINDI}`}>{statementObject[LANG_HINDI]}</div>)
          // // else console.log(s)
        // }
      }
    }
    return domContent
  }

  makeStatementElement = (statementObject, key) => {
    if (!statementObject) return
    let domContent = []
    // for (let i=0; i<statementObject.length; i++) console.log(`persona.setStatement = statementObject.length = ${statementObject.length}`)
    console.log(`persona.setStatement : statementObject.keys = ${statementObject.keys}. statementObject[LANG_ENGLISH] = ${statementObject[LANG_ENGLISH]}`)
    // for (let i=0; i<statementObject.keys; i++){
    //   console.log('iterating through statementObjects')
    // let k = statementObject.keys[i]
    // let s = statementObject[k]
    domContent.push(<div key={`${key}-${LANG_ENGLISH}`}>{statementObject[LANG_ENGLISH]}</div>)
    domContent.push(<div key={`${key}-${LANG_HINDI}`}>{statementObject[LANG_HINDI]}</div>)
    // else console.log(s)
    // }
    return domContent
  }

  setOptionStatement = (item, key) => {
    let statementObject = item[STATEMENT]
    if (statementObject && typeof statementObject === "string") {
      console.log("statement is a string")
      return statementObject;
    }
    if (typeof statementObject !== "object") statementObject = statementObject[0]
    return this.makeStatementElement(statementObject, key)
  }

  setStatement = (item, key) => {
    let statementObject = item[STATEMENT]
    if (statementObject && typeof statementObject === "string")
      return statementObject
    statementObject = statementObject[0]
    return this.makeStatementElement(statementObject, key)
  }

  render() {
    const {
      messageData, id, statement, nextQuestion, name2, Statement2, next2, a, /*b,*/ messageId, inputRef, rootSheetRef, level1SheetRef} = this.state

    console.log('persona.render : dat = ', messageData)
    return (
      <div className="BotBuilder">
        <div className="bb-root-header">
          <Header handle={this.handle} /*className = { "bb-head" }*//>
        </div>

        {/*------------------------------ */}
        {/*<div className="" style={{ display: "flex", height: "80vh", margin:"15px" }}>*/}
          <div
            className="root_sheet"
            onScroll={this.handleRootScroll}
            ref={rootSheetRef}
          >
            <div className="field">
              {messageData.map((item) => (
                <div className="root-row">
                  <div key={`${item[ID]}-f1`} className="f1 tooltip-content">{item._id}</div>
                  <div key={`${item[ID]}-f2`} className="f2">{item[ID]}</div>
                  <div key={`${item[ID]}-f3`} className="f3">{this.setStatement(item, `${item[ID]}-f3`)}</div>
                  <div key={`${item[ID]}-f4`} className="f4">{item[NEXT_QUESTION]}</div>
                  <div key={`${item[ID]}-f5`} className="f5">{this.setOption(item, `${item[ID]}-f5`)}</div>
                </div>
              ))}
            </div>
          </div>
        {/*</div>*/}
        {/*------------------------------ */}

        <div className="level1-layer-pop">
          {a && (
            <div className="level1-sheet" onScroll={this.handleLayerScroll} ref={level1SheetRef}>
              {/*<div className="layer_row">*/}
                <Heading />
                <div className="layer_table_values">
                  {messageData.map((item) => (
                    <div className="del" key={item.id}>
                      <div>{item.name2}</div>
                      <div>{item.Statement2}</div>
                      <div>{item.next2}</div>
                    </div>
                  ))}
                </div>
              {/*</div>*/}
            </div>
          )}
        </div>

        <></>

        <div className="inp" style={{margin:"15px"}}>
          <div className="main">
            <div className="inp">
              <div className="i1">
                {/* <input placeholder="Id" /> */}
                {/*{val}*/}
              </div>
              <div className="i2">
                <input
                  placeholder="Name"
                  value={id}
                  onChange={(event) => this.setState({ id: event.target.value })}
                  ref={inputRef}
                  autoFocus
                />
              </div>
              <div className="i3">
                <input
                  placeholder="Statement"
                  type="text"
                  value={statement}
                  onChange={(event) => this.setState({Statement:event.target.value})}
                />
              </div>
              <div className="i4">
                <input
                  placeholder="Next"
                  type="text"
                  value={nextQuestion}
                  onChange={(event) => this.setState({nextQuestion:event.target.value})}
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
                const{ id, name2, nextQuestion, next2, statement, Statement2 } = this.state
                const msg = { id: id, Statement1: statement, nextQuestion,
                  name2: name2, Statement2: Statement2, next2: next2,
                };
                socket.emit("sending", msg);
                console.log("socket has emitted on submit")
                this.setState({id: id, name2, nextQuestion, next2, Statement1: statement, Statement2})
                inputRef.current.focus();
              }}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}