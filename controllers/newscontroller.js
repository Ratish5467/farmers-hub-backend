import axios from "axios";

export const getNews = async (req, res) => {
  try {
    const API_KEY = process.env.NEWS_API_KEY;

    const { data } = await axios.get(
      `https://newsapi.org/v2/everything`,
      {
        params: {
          q: "agriculture OR farming",
          language: "en",
          sortBy: "publishedAt",
          pageSize: 10,
          apiKey: API_KEY,
        },
      }
    );

    res.json({
      count: data.articles.length,
      articles: data.articles.map((a) => ({
        title: a.title,
        description: a.description,
        url: a.url,
        image: a.urlToImage,
        publishedAt: a.publishedAt,
        source: a.source.name,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch news", error: err.message });
  }
};
