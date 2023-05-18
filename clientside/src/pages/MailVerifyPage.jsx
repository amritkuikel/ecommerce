import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

setTimeout(() => {
  window.close();
}, 1000);
const MailVerifyPage = () => {
  const params = useParams();
    const data = {
        'token':params.token.toString(),
    }

  useEffect(() => {
    axios.post("/auth/tokenverify", data ).then((log) => {
      return alert(log.data.msg);
    });
  },[]);
  return (
    <div>
      <div>MailVerifyPage</div>
    </div>
  );
};
export default MailVerifyPage;
