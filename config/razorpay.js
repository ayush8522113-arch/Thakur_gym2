import Razorpay from "razorpay";
import ENV from "./env.js";

if (!ENV.RAZORPAY_KEY_ID || !ENV.RAZORPAY_KEY_SECRET) {
  throw new Error("Razorpay keys missing in env.js");
}

const razorpay = new Razorpay({
  key_id: ENV.RAZORPAY_KEY_ID,
  key_secret: ENV.RAZORPAY_KEY_SECRET
});

export default razorpay;
