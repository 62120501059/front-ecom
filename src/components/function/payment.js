import axios from "axios";

export const resetPass = async (param, data) =>
  await axios.post(
    process.env.REACT_APP_API +
      `/password-reset/${param.id}/verify/${param.token}`,
    data
  );
