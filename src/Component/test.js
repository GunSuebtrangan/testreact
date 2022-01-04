import Datacontext from "../data/Datacontext";
const Test = (props) => {
  return (
    <>
      <button
        onClick={() => {
          console.log(props);
        }}
      ></button>
    </>
  );
};
export default Test;
