import Order from "../models/Order.js";
import jwt from "jsonwebtoken";

const makeOrder = async (req, res) => {
  const order = new Order(req.body);
  try {
    const newOrder = await order.save();
    res.json(newOrder);
  } catch (error) {
    console.log(error);
  }
};

const getOrders = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (error, userInfo) => {
      if (error) throw error;
      const orders = await Order.find({ user: userInfo.id });
      res.json({ orders });
    });
  } else {
    res.json(null);
  }
};

export { makeOrder, getOrders };
