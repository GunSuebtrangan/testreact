import Approvedata from "./Approvedata";
const Approve = () => {
  const html = (
    <>
      <div className="col-md-12">
        <div className="card shadow mb-4 ">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary text-center">
              รายการอนุมัติ
            </h6>
          </div>
          <div class="card-body">
            <Approvedata />
          </div>
        </div>
      </div>
    </>
  );
  return html;
};
export default Approve;
