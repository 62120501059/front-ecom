import axios from "axios";

export const register = async (data) =>
  await axios.post(process.env.REACT_APP_API + "/register", data);

export const login = async (data) =>
  await axios.post(process.env.REACT_APP_API + "/login", data);

export const verifyRegister = async (param) =>
  await axios.get(
    process.env.REACT_APP_API + `/users/${param.id}/verify/${param.token}`
  );

export const forgotPassword = async (data) =>
  await axios.post(process.env.REACT_APP_API + `/forgot-password`, data);

export const verifyResetPass = async (param) =>
  await axios.get(
    process.env.REACT_APP_API +
      `/password-reset/${param.id}/verify/${param.token}`
  );

export const resetPass = async (param, data) =>
  await axios.post(
    process.env.REACT_APP_API +
      `/password-reset/${param.id}/verify/${param.token}`,
    data
  );

export const currentUser = async (authtoken) =>
  await axios.post(
    process.env.REACT_APP_API + "/current-user",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const currentAdmin = async (authtoken) =>
  await axios.post(
    process.env.REACT_APP_API + "/current-admin",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
