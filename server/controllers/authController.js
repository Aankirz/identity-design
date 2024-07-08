// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({
      name,
      email,
      password: bcrypt.hashSync(password, 8),
    });
    await user.save();
    res.status(201).send({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).send({ message: 'User not found' });
  
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) return res.status(401).send({ message: 'Invalid password' });
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 });
      res.status(200).send({ user, token });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  

exports.logout = (req, res) => {
  try {
    res.status(200).send({ message: 'User logged out successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
