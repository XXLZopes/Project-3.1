import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class Modal extends Component {
  componentDidMount() {
    const options = {
      onOpenStart: () => {
        console.log("Open Start");
      },
      onOpenEnd: () => {
        console.log("Open End");
      },
      onCloseStart: () => {
        console.log("Close Start");
      },
      onCloseEnd: () => {
        console.log("Close End");
      },
      inDuration: 550,
      outDuration: 750,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);
  }

  render() {
    return (
    <div> 
      <div className="bball">
        <a>
          {/* // className="waves-effect waves-light btn modal-trigger"
          // data-target="modal1" */}
          <img className="modal-trigger" src="https://i.imgur.com/6r8BVdf.png"  data-target="modal1" width={window.innerHeight-(window.innerHeight - window.innerWidth / 6)}/>
        </a>
        </div>
    
        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal bottom-sheet"
        >
          <div className="modal-content">
            <h4>Welcome User</h4>
            <p>This is Best Basketball App ever .  yea Period I said it.  If you dont believe us we will send Nick over to deliver an attitude adjustment.</p>
          </div>
          <div className="modal-footer background-color: black" >
            <a className="modal-close waves-effect waves-black btn-flat">
              End Session
            </a>
            <a className="modal-close waves-effect waves-purple btn-flat">
              Start Session
            </a>
          </div>
        </div>
    </div>
    );
  }
}

export default Modal;
