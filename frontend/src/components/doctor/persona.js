const express = require("express");
const app = express();
const { Server } = require("socket.io");
const cors = require("cors");
const client = require("socket.io-client");
const { BACKEND_URL_DEV } = require("../../config");

export default class Persona extends React.Component {

  firstDivRef = useRef();
  secondDivRef = useRef();

  handleScrollFirst = (scroll) => {
    secondDivRef.current.scrollTop = scroll.target.scrollTop;
  };

  handleScrollSecond = (scroll) => {
    firstDivRef.current.scrollTop = scroll.target.scrollTop;
  };

  handle = () => {
    console.log("jjhjbhjjh_jnjksdfds");
    setA(!a);
  }

  sendMessage = () => {
    const msg = {
      name1: name1,
      Statement1: Statement1,
      next1: next1,
      name2: name2,
      Statement2: Statement2,
      next2: next2,
    };

    socket.emit("sending", msg);
    setName1(" ");
    setName2("");
    setNext1("");
    setNext2("");
    setStatement2("");
    setStatement1("");
    inputRef.current.focus();
  };

  // useEffect(() => {
  //   socket.on("send_last_val", async (asa, dd) => {
  //     setData(dd);
  //     if (asa === null) {
  //       setVal(300);
  //     } else {
  //       setVal(asa._id + 1);
  //     }
  //   });
  // }, []);


  componentDidMount() {

  }  

  componentWillUnmount() {
    if (this.socket) this.socket.disconnect();
    const [dat, setData] = useState([]);
    const [name1, setName1] = useState("");
    const [Statement1, setStatement1] = useState("");
    const [next1, setNext1] = useState("");
    const [name2, setName2] = useState("");
    const [Statement2, setStatement2] = useState("");
    const [next2, setNext2] = useState("");
    const [val, setVal] = useState(300);
    const inputRef = useRef();
    const [a, setA] = useState(false);

    
  }

  connect = () => {
    const { patientId } = this.state;

    this.setState({ requesting: true });

    // create socket based on environment - dev/prod
    this.socket = client(process.env.NODE_ENV === 'development' ? BACKEND_URL_DEV : '/', {
      path: '/doctor/persona',
      transports: ['websocket'],
      query: {
        _id,
        type: 'doctor'
      }
    });

    // this.socket.on()

    // this.socket.on('message', ({ message, from }) => {
    //   if (from === this.state.doctor) {
    //     this.setState({ incomingTyping: false });
    //     this.enterMessageIntoChat(message, 'incoming');
    //   }
    // });

  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <Header handle={handle} />
        </div>
  
        {/*------------------------------ */}
        <div
          className="App"
          style={{
            display: "flex",
            height: "70vh",
            overflow: "hidden",
          }}
        >
          <div className="main_pop">
            {a && (
              <div
                className="main_main"
                onScroll={handleScrollFirst}
                ref={firstDivRef}
                style={{
  
                  overflow: "scroll",
                }}
              >
                <div className="row_main" style={{height:"10vh"}}>
                  <Heading />
                  <div className="map" style={{height:"100vh"}}>
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
            onScroll={handleScrollSecond}
            ref={secondDivRef}
          >
            <div
              className="field"
             
            >
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
              <button onClick={sendMessage}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}