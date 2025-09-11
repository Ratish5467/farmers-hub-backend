import axios from "axios";

const BASE_URL =
  "https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24";
const API_KEY = process.env.DATA_GOV_API_KEY;

// ✅ Madhya Pradesh ka aaj ka mandi data
export const getTodayMandiRates = async (req, res) => {
  try {
    const { state = "Madhya Pradesh" } = req.query;

   const today = new Date();
const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0");
const yyyy = today.getFullYear();
const todayStr = `${yyyy}-${mm}-${dd}`; // ✅ Correct format


    const { data } = await axios.get(BASE_URL, {
      params: {
        "api-key": API_KEY,
        format: "json",
        limit: 500,
        State: state,
        Arrival_Date: todayStr,
      },
    });

    if (!data.records || data.records.length === 0) {
      return res.status(404).json({
        message: `No mandi data found for ${state} on ${todayStr}`,
      });
    }

    const items = data.records.map((r) => ({
      state: r.State,
      district: r.District,
      market: r.Market,
      commodity: r.Commodity,
      variety: r.Variety,
      grade: r.Grade,
      arrivalDate: r.Arrival_Date,
      minPrice: r.Min_Price,
      maxPrice: r.Max_Price,
      modalPrice: r.Modal_Price,
    }));

    return res.json({
      message: `Today's mandi data for ${state}`,
      date: todayStr,
      count: items.length,
      data: items,
    });
  } catch (err) {
    console.error("Error fetching mandi data:", err.message);
    res.status(500).json({
      message: "Failed to fetch today’s mandi rates",
      error: err.message,
    });
  }
};
