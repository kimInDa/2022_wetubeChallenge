import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleError = (error) => console.log("❌ DB Error", error);
db.on("error", handleError);
//=== db.on("error", (error) => console.log("DB Error", error));

const handleOpen = () => console.log("✅ Connected to DB");
db.once("open", handleOpen);
