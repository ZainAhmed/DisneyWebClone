type PropsType = {
  errorMsg: string;
};

function ErrorComponent({ errorMsg }: PropsType) {
  return <div className="m-t-[100px]">{errorMsg}</div>;
}

export default ErrorComponent;
