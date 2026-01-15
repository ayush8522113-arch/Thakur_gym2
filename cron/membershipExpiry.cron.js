import cron from "node-cron";
import UserMembership from "../models/UserMembership.model.js";

const membershipExpiryJob = () => {
  // Runs every day at midnight
  cron.schedule("0 0 * * *", async () => {
    try {
      const now = new Date();

      const expired = await UserMembership.updateMany(
        {
          endDate: { $lt: now },
          isActive: true
        },
        {
          $set: { isActive: false }
        }
      );

      console.log(
        `Membership expiry job ran. Expired: ${expired.modifiedCount}`
      );
    } catch (err) {
      console.error("Membership expiry cron failed", err);
    }
  });
};

export default membershipExpiryJob;
