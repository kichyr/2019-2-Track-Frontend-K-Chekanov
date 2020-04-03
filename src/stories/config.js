import React, { useState } from "react";
import styled from "styled-components";
import { configure, addDecorator } from "@storybook/react";

function Stage({ children, ...props }) {
  const [state, setState] = useState({});
  return <div {...props}>{children(state, setState)}</div>;
}


function loadStories() {
  require("../src/stories/");
}


configure(loadStories, module);