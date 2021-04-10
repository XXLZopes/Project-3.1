import React, { Component } from "react";
import {useMutation, useQuery} from '@apollo/react-hooks';
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { GET_ME } from '../../utils/queries';

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
      <img className="img" src="./assets/MYLITICS.gif" width="70%" alt='' />
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
            <a 
            onClick={() => {
              window.location = window.location = '/#/login/';
          }
      }
            className="modal-close waves-effect waves-black btn-flat">
              Login
            </a>
            <a 
            onClick={() => {
              window.location = window.location = '/#/signup/';
          }
      }
            className="modal-close waves-effect waves-purple btn-flat">
              Sign Up
              
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
