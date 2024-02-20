import ClipLoader from "react-spinners/ClipLoader";
function loading() {
  return (
    <ClipLoader
      color="36d7b7"
      loading={true}
      // cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

export default loading;
