import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
} from "../controllers/client.js";

const router = express.Router();

router.get("/products", async (req, res, next) => {
  try {
    // replace with DB query when ready
    res.status(200).json([
      {
        _id: "p1",
        name: "Sample Product",
        description: "Replace with real data",
        price: 19.99,
        rating: 4.2,
        category: "demo",
        supply: 120,
        stat: { yearlySalesTotal: 1200, yearlyTotalSoldUnits: 300 },
      },
    ]);
  } catch (e) {
    next(e);
  }
});
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

export default router;
