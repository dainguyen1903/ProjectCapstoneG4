import api from ".";
const paymentUrl = "api/payment/";
export const paymentApi = {
  createpayment: (data) => {
    return api.post(
      paymentUrl + `create-payment`,data)
  },

  
};
