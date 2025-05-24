import "./msg.css";

const Confrom = ({ error }) => {
  return <div>{error}</div>;
};

const Error = ({ error }) => {
  return <div>{error}</div>;
};

const Info = ({ error }) => {
  return <div>{error}</div>;
};

const Werning = ({ error }) => {
  return <div>{error}</div>;
};

const Msg = {
  Confrom,
  Error,
  Info,
  Werning,
};

export default Msg;
