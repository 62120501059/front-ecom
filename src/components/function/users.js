import axios from "axios";

export const listUser = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/admin/manage-user", {
    headers: {
      authtoken,
    },
  });
};

export const readUsers = async (authtoken, id) => {
  return await axios.get(
    process.env.REACT_APP_API + "/admin/manage-user/" + id,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateUser = async (authtoken, id, values) => {
  return await axios.put(
    process.env.REACT_APP_API + "/admin/manage-user/" + id,
    values,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const removeUser = async (authtoken, id) => {
  return await axios.delete(
    process.env.REACT_APP_API + "/admin/manage-user/" + id,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const userCart = async (authtoken, cart) => {
  return await axios.post(
    process.env.REACT_APP_API + "/user/cart",
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getUserCart = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/user/cart", {
    headers: {
      authtoken,
    },
  });
};

export const emptyCart = async (authtoken) => {
  return await axios.delete(process.env.REACT_APP_API + "/user/cart", {
    headers: {
      authtoken,
    },
  });
};
//Save Addresss
export const saveAddress = async (authtoken, userData) => {
  return await axios.post(
    process.env.REACT_APP_API + "/user/address",
    { userData },
    {
      headers: {
        authtoken,
      },
    }
  );
};
//Save order
export const saveOrder = async (authtoken, data) => {
  return await axios.post(
    process.env.REACT_APP_API + "/user/order",
    { data },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getOrderbyAdmin = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/admin/order", {
    headers: {
      authtoken,
    },
  });
};

export const getOrderbyUser = async (authtoken, id) => {
  return await axios.get(process.env.REACT_APP_API + "/user/getOrder/" + id, {
    headers: {
      authtoken,
    },
  });
};

export const getAmountOrderbyAdmin = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/admin/amount-order", {
    headers: {
      authtoken,
    },
  });
};

export const incomeByAdmin = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/admin/income", {
    headers: {
      authtoken,
    },
  });
};

export const updateOrderbyAdmin = async (authtoken, id, values) => {
  return await axios.put(
    process.env.REACT_APP_API + "/admin/order/" + id,
    values,
    {
      headers: {
        authtoken,
      },
    }
  );
};


export const updateOrderbyAdmin2 = async (authtoken, id, values) => {
  return await axios.put(
    process.env.REACT_APP_API + "/admin/order2/" + id,
    values,
    {
      headers: {
        authtoken,
      },
    }
  );
};