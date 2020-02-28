import React from 'react';
import { storiesOf } from "@storybook/react";
import BackArrow from "../components/BackArrow/BackArrow"
import BurgerButton from "../components/BurgerButton/BurgerButton"
import PlusButton from "../components/CreateNewChat/CreateNewChat"
import { DragAndDropImg } from "../components/DialogPage/MessageForm"
import { InputPanel } from "../components/DialogPage/MessageForm"

storiesOf("Simple", module)
  // Back Arrow button
  .add("BackArrow", () => (
    <div
        style={{
          flex: '0.2',
          height: '200px',
          width: '200px',
        }}
        role="button"
        tabIndex={0}
      >
        <BackArrow />
    </div>
  ))
  .add("BurgerButton", ()=>(
    <div style={{
      width: '20%',
      backgroundColor: "grey",
    }}>
      <BurgerButton />
    </div>
  ))
  .add("DragAndDropBackground", ()=>(
    <DragAndDropImg dragging={(e) => {}} handleDragOut={(e) => {}} handleDrop={(e) => {}}/>
  ))

storiesOf("Interactive", module)
  .add("createNewChatForm",()=>(
    <PlusButton />
  ))
  
