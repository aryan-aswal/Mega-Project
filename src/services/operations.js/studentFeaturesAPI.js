import toast from "react-hot-toast";
import { studentEndpoints } from "../api";
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/Images/rzp.png";
import { setPaymentLoading } from "../../slices/courseSlice"
import { resetCart } from "../../slices/cartSlice";
const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

const loadScript = (script) => {
  return new Promise((resolve, reject) => {
    const scriptElement = document.createElement("script");
    scriptElement.src = script;
    scriptElement.onload = () => {
      resolve(true);
    };
    scriptElement.onerror = () => {};
    document.body.appendChild(scriptElement);
  });
};
const sendPaymentSuccessEmail = async (response, amount, token) => {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      { Authorization: `Bearer ${token}` }
    );
  } catch (error) {
    console.log("PAYMENT SUCCESS EMAIL ERROR...", error);
  }
};

const verifyPayment = async (bodyData, token, navigate, dispatch) => {
  const toastId = toast.loading("Verify Payment");

  dispatch(setPaymentLoading(true));
  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, { Authorization: `Bearer ${token}`,});
    console.log(response)
    if (response.data.success) {
      toast.success("Payment Successful");
      navigate("/dashboard/enrolled-courses");
      dispatch(resetCart());
    } else {
      toast.error("Payment Failed");
    }
  } catch (error) {
    console.log("VERIFY PAYMENT ERROR...", error);
    toast.error("Payment Failed");
  }
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
};
export async function buyCourse(token, courses, user, navigate, dispatch) {
  const toastId = toast.loading("Loading...");
  console.log("hello")
  try {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      { Authorization: `Bearer ${token}` }
    );
    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }

    const options = {
      key: import.meta.env.VITE_API_RAZORPAY_KEY,
      amount: orderResponse.data.data.amount,
      currency: orderResponse.data.data.currency,
      name: "Course Purchase",
      description: "Course Purchase",
      image: rzpLogo,
      order_id: orderResponse.data.data.id,
      handler: async function (response) {
        console.log(response);
        sendPaymentSuccessEmail(
            response,
            orderResponse.data.data.amount,
            token
        );
        // verify payment
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
        // send successfull mail

      },
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObject = new window.Razorpay(options);

    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops! Payment Failed.");
      console.log(response.error);
    });
  } catch (error) {
    console.log("PAYMENT API ERROR...", error);
    toast.error("Could not buy course");
  }
  toast.dismiss(toastId);
}
