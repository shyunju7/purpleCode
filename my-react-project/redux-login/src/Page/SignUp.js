import React, { useCallback, useRef, useState, useEffect } from "react";
import { Div } from "../Styled/CommonStyled";
import {
  ErrorMsg,
  Input,
  InputDiv,
  Label,
  Button,
} from "../Styled/SignUpStyled";
import { useDispatch, useSelector } from "react-redux";
import {registerUser} from "../reducer/User";

const SignUp = ({ history }) => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [idCheck, setIdCheck] = useState(false);
  const [pwCheck, setPwCheck] = useState(true);

  const nextId = useRef(2);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.users);

  const checkSpace = (value) => {
    const space = /\s/;
    if (space.exec(value)) {
      alert("공백은 입력할 수 없습니다.");
      value.replace(space, "");
      return;
    }
  };

  useEffect(() => {
    if (confirmPw !== userPw) {
      setPwCheck(false);
    } else {
      setPwCheck(true);
    }
  }, [confirmPw]);

  useEffect(() => {
    const findUser = users.find((user) => user.userId === userId);
    if (findUser) {
      setIdCheck(false);
    } else {
      setIdCheck(true);
    }
  }, [userId]);

  const onChange = useCallback(
    (e) => {
      const name = e.target.name;
      const value = e.target.value;

      checkSpace(value);

      if (name === "userId") setUserId(value);
      else if (name === "userPw") setUserPw(value);
      else setConfirmPw(value);
    },
    [setUserId, setUserPw, setConfirmPw, setIdCheck]
  );

  const onReset = useCallback(() => {
    setUserId("");
    setUserPw("");
    setConfirmPw("");
  }, [setUserId, setUserPw, setConfirmPw]);

  const createUser = useCallback(() => {
    if (userId.length == 0 || userPw.length == 0) {
      alert("모든 입력란을 입력해주세요!");
      return;
    }

    if (!idCheck || !pwCheck) {
      alert("입력란을 확인해주세요!");
      return;
    }

    dispatch(registerUser({userId, userPw}));


    onReset();
    nextId.current += 1;

    alert("회원가입이 성공적으로 처리되었습니다.");
    history.push("/");
  }, [dispatch, userId, userPw, onReset]);

  return (
    <Div>
      <h1> 회원가입 </h1>
      <InputDiv>
        <Label>아이디</Label>
        <Input
          name="userId"
          placeholder="아이디 입력"
          onChange={onChange}
          value={userId}
          required
        />

        {!idCheck && <ErrorMsg>중복된 아이디입니다.</ErrorMsg>}

        <br />
        <Label>비밀번호</Label>
        <Input
          name="userPw"
          type="password"
          placeholder="비밀번호 입력"
          onChange={onChange}
          value={userPw}
          required
        />
        <br />
        <Label>확인 비밀번호</Label>
        <Input
          name="confirmPw"
          type="password"
          placeholder="확인 비밀번호 입력"
          onChange={onChange}
          value={confirmPw}
          required
        />

        {pwCheck && <p></p>}
        {!pwCheck && <ErrorMsg>비밀번호가 일치하지않습니다!</ErrorMsg>}
        <br />
        <br />
        <Button onClick={createUser}> 가입하기 </Button>
      </InputDiv>
    </Div>
  );
};

export default SignUp;
