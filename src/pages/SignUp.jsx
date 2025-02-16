import React, { useState, useRef } from "react";
import HeadText from "../components/HeadText";
import LabelAndInput from "../components/LabelAndInput";
import MainButton from "../components/MainButton";
import PageNav from "../components/PageNav";

function SignUp() {
  const [username, setUsername] = useState({
    val: "",
    isError: false,
    errorMsg: "",
  });
  const [email, setEmail] = useState({ val: "", isError: false, errorMsg: "" });
  const [phoneNum, setPhoneNum] = useState({
    val: "",
    isError: false,
    errorMsg: "",
  });
  const [password, setPassword] = useState({
    val: "",
    isError: false,
    errorMsg: "",
  });
  const [touched, setTouched] = useState(false);

  const validatedNameRef = useRef(false);
  const validatedEmailRef = useRef(false);
  const validatedPhoneRef = useRef(false);
  const validatedPassRef = useRef(false);
  const checkedRef = useRef();

  const validateName = () => {
    if (!username.val) {
      setUsername({
        ...username,
        isError: true,
        errorMsg: "Please input your name",
      });
      return;
    }
    setUsername({
      ...username,
      isError: false,
      errorMsg: "",
    });
    validatedNameRef.current = true;
  };

  const validateEmail = () => {
    if (!email.val) {
      setEmail({
        ...email,
        isError: true,
        errorMsg: "Please input your email",
      });
      return;
    }
    const reg = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    if (!reg.test(email.val)) {
      setEmail({
        ...email,
        isError: true,
        errorMsg: "Invalid email",
      });
      return;
    }
    setEmail({
      ...email,
      isError: false,
      errorMsg: "",
    });
    validatedEmailRef.current = true;
  };

  const validatePhone = () => {
    if (!phoneNum.val) {
      setPhoneNum({
        ...phoneNum,
        isError: true,
        errorMsg: "Please input your phone number",
      });
      return;
    }
    const reg = /^\d{11}$/;
    if (!reg.test(phoneNum.val)) {
      setPhoneNum({
        ...phoneNum,
        isError: true,
        errorMsg: "Invalid phone number",
      });
      console.log("Invalid phone num", reg.test(phoneNum.val));
      return;
    }
    setPhoneNum({
      ...phoneNum,
      isError: false,
      errorMsg: "",
    });
    validatedPhoneRef.current = true;
  };

  const validatePassword = () => {
    if (!password.val) {
      setPassword({
        ...password,
        isError: true,
        errorMsg: "Please input your password",
      });
      return;
    }
    if (password.val.length < 6) {
      setPassword({
        ...password,
        isError: true,
        errorMsg: "Password should be more than 6 characters",
      });
      return;
    }
    setPassword({
      ...password,
      isError: false,
      errorMsg: "",
    });
    validatedPassRef.current = true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched(true);
    validateName();
    validateEmail();
    validatePhone();
    validatePassword();
    const valid =
      validatedNameRef.current &&
      validatedEmailRef.current &&
      validatedPhoneRef.current &&
      validatedPassRef.current &&
      checkedRef.current.checked;
    if (valid) {
      console.log("Valid");
    } else console.log("Not valid");
  };

  return (
    <div className="p-4">
      <PageNav pageTitle={"Sign Up"} />
      <section>
        <HeadText addStyles={"mb-3"}>Welcome to Pipeline</HeadText>
        <p className="mb-5">Complete the sign up to get started</p>
      </section>
      <form noValidate onSubmit={handleSubmit}>
        <LabelAndInput
          labelContent={"Name"}
          inputName={"name"}
          inputType={"text"}
          value={username.val}
          isError={username.isError}
          errorMsg={username.errorMsg}
          onChange={(event) => {
            setUsername({ ...username, val: event.target.value });
          }}
          onBlur={() => {
            if (touched) {
              validateName();
            }
          }}
        />
        <LabelAndInput
          labelContent={"Email"}
          inputName={"email"}
          inputType={"email"}
          value={email.val}
          isError={email.isError}
          errorMsg={email.errorMsg}
          onChange={(event) => {
            setEmail({ ...email, val: event.target.value });
          }}
          onBlur={() => {
            if (touched) {
              validateEmail();
            }
          }}
        />
        <LabelAndInput
          labelContent={"Phone Number"}
          inputName={"phoneNumber"}
          inputType={"tel"}
          isError={phoneNum.isError}
          errorMsg={phoneNum.errorMsg}
          value={phoneNum.val}
          onChange={(event) => {
            setPhoneNum({ ...phoneNum, val: event.target.value });
          }}
          onBlur={() => {
            if (touched) {
              validatePhone();
            }
          }}
        />
        <LabelAndInput
          labelContent={"Password"}
          inputName={"password"}
          inputType={"password"}
          isError={password.isError}
          errorMsg={password.errorMsg}
          onChange={(event) => {
            setPassword({ ...password, val: event.target.value });
          }}
          value={password.val}
          onBlur={() => {
            if (touched) {
              validatePassword();
            }
          }}
        />
        <span>
          <input
            type="checkbox"
            className="mr-2 outline-none"
            ref={checkedRef}
          />
          <span>
            By signing up, you agree to the{" "}
            <a href="#" className="text-mainBlue">
              Terms of Service and Privacy Policy
            </a>
          </span>
          <MainButton
            addStyles={"mt-10"}
            onClick={() => {
              setTouched(true);
            }}
          >
            Sign Up
          </MainButton>
        </span>
      </form>
    </div>
  );
}

export default SignUp;
