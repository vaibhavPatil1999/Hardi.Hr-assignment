const userModel = require("../models/user");
const adminModel = require("../models/admin");
const jwt = require("jsonwebtoken");
const adminRegistration = async (req, res) => {
  const { name } = req.body;
  try {
    const data = new adminModel({ name });
    const admin = await data.save();
    const token = jwt.sign(admin.id, process.env.JWT_ACCESS_KEY);
    res.status(200).json({ admin, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const createUser = async (req, res) => {
  const { name, age } = req.body;
  const newUser = new userModel({ name, age });
  try {
    const saveUser = await newUser.save();
    res.status(200).json({ saveUser, suc: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getAllUser = async (req, res) => {
  try {
    const allUsers = await userModel.find();
    res.json(allUsers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (user === null) {
      res.json(`no user available with this id -${id}`);
    } else {
      res.json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
const updateUser = async (req, res) => {
  const updatedBody = req.body;
  const { id } = req.params;
  const options = { new: true };
  try {
    updated = await userModel.findByIdAndUpdate(id, updatedBody, options);
    if (updated == null) {
      res.json(`no user available with this id -${id}`);
    } else {
      res.json(updated);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await userModel.findByIdAndDelete(id);
    if (result == null) {
      res.json(
        `no user available with this id -${id} or user has already deleted`
      );
    } else {
      res.json(`this user - ${result.name} - has deleted`);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = {
  getUser,
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  adminRegistration,
};
