import React from "react";
import { Template, Title } from "../Styled/common-styled";

const TodoTemplate = ({ children }) => {
  return (
    <Template>
      <Title> 할 일 </Title>
      {children}
    </Template>
  );
};

export default TodoTemplate;
