// scripts/seedAdmin.ts
import "dotenv/config";
import dbConnect from "../src/lib/dbConnect";
import User from "../src/models/User";

(async () => {
  await dbConnect();
  const email = "admin@example.com";
  const password = "ChangeMe123!";
  if (await User.findOne({ email })) {
    console.log("⚠️ Admin existe déjà");
    process.exit(0);
  }
  await new User({ email, password, role: "admin" }).save();
  console.log("✅ Admin créé :", email);
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
