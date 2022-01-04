const Dtleave = (props) => {
  const { data } = props;
  // console.log(data);
  var i = 0;
  const html = (
    <>
      {data.length === 0 ? (
        <table className="table" style={{ textAlign: "center" }}>
          <tr>
            <th>ไม่มีข้อมูล</th>
          </tr>
        </table>
      ) : (
        <table className="table">
          <thead>
            <tr
              style={{
                backgroundColor: "#6891C3",
                color: "white",
                textAlign: "center",
              }}
            >
              <th
                style={{
                  backgroundColor: "#6891C3",
                  color: "white",
                  textAlign: "center",
                }}
              >
                ลำดับ
              </th>
              <th
                style={{
                  backgroundColor: "#6891C3",
                  color: "white",
                  textAlign: "center",
                }}
              >
                ชื่อพนักงาน
              </th>
              <th
                style={{
                  backgroundColor: "#6891C3",
                  color: "white",
                  textAlign: "center",
                }}
              >
                เหตุผล
              </th>
              <th
                style={{
                  backgroundColor: "#6891C3",
                  color: "white",
                  textAlign: "center",
                }}
              >
                เริ่มลาวันที่
              </th>
              <th
                style={{
                  backgroundColor: "#6891C3",
                  color: "white",
                  textAlign: "center",
                }}
              >
                ถึงวันที่
              </th>
              <th
                style={{
                  backgroundColor: "#6891C3",
                  color: "white",
                  textAlign: "center",
                }}
              >
                รูปแบบ
              </th>
              <th
                style={{
                  backgroundColor: "#6891C3",
                  color: "white",
                  textAlign: "center",
                }}
              >
                จำนวนวันลา
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((dt) => {
              return (
                <tr>
                  <td style={{ textAlign: "center" }}>{++i}</td>
                  <td style={{ textAlign: "center" }}>
                    {dt.empleave_recdspname}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {dt.empleave_dspcprem}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {dt.empleave_stdate2.substring(0, 10)}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {dt.empleave_endate2.substring(0, 10)}
                  </td>
                  <td style={{ textAlign: "center" }}>{dt.msttypeleave_var}</td>
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {dt.empleave_totaldays}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
  return html;
};
export default Dtleave;
