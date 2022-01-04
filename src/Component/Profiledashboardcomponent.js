import Myprofile from "./Myprofilecomponent";
import Stat from "./Graphcomponent";
// import { Test } from "./Test2";
const Personal = () => {
  const htmlprofile = (
    <>
      <div className="row">
        <Myprofile />
        <Stat />
      </div>
    </>
  );
  return htmlprofile;
};
export default Personal;
