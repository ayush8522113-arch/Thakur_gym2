const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://ayush8522113_db_user:janmastm25082025krishna@gym-cluster.06xh84y.mongodb.net/gymdb"
  )
  .then(() => {
    console.log("TEST CONNECTED");
    process.exit(0);
  })
  .catch((err) => {
    console.error("TEST ERROR:", err.message);
    process.exit(1);
  });
