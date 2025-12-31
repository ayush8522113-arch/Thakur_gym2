const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.registerUser = async (req, res) => {
  console.log("=== REGISTER HIT ===");
  console.log("BODY:", req.body);

  try {
    const { name, phone, email, password } = req.body;

    if (!name ||!phone || !email || !password) {
      console.log("❌ Missing fields");
      return res.status(400).json({ message: "Missing fields" });
    }

    const userExists = await User.findOne({ email });
    console.log("USER EXISTS:", userExists);

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }


    console.log("HASHED PASSWORD OK");

    const user = await User.create({
      name,
      phone,
      email,
      password,
    });

    console.log("USER CREATED:", user);

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("🔥 REGISTER CRASH ERROR 🔥");
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


// LOGIN
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role:user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
