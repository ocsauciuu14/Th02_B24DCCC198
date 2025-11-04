import { useEffect, useState } from "react";
import axios from "axios";
import type { NewsArticle, NewsResponse } from "../types";

export default function NewsApp() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setError(null); setLoading(true);
        const res = await axios.get<NewsResponse>(
          "https://api.spaceflightnewsapi.net/v4/articles?limit=10"
        );
        setArticles(res.data.results);
      } catch {
        setError("Không lấy được tin tức.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section>
      <h2>Bài 3: Ứng dụng xem tin tức (Spaceflight News)</h2>

      {loading && <p>Đang tải...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading && !error && (
        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))"
          }}
        >
          {articles.map((a) => (
            <article
              key={a.id}
              style={{
                border: "1px solid #eee",
                borderRadius: 10,
                overflow: "hidden",
                background: "#fff",
                display: "flex",
                flexDirection: "column"
              }}
            >
              {/* Ảnh */}
              <div style={{ width: "100%", position: "relative" }}>
                {a.image_url ? (
                  <img
                    src={a.image_url}
                    alt={a.title}
                    style={{
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                      display: "block"
                    }}
                    loading="lazy"
                  />
                ) : (
                  <div
                    style={{
                      height: 180,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#f3f4f6"
                    }}
                  >
                    <span style={{ opacity: 0.6 }}>Không có ảnh</span>
                  </div>
                )}
              </div>

              
              <div style={{ padding: 12, display: "grid", gap: 8 }}>
                <h3 style={{ margin: 0, fontSize: 18, lineHeight: 1.3 }}>
                  {a.title}
                </h3>

                <p style={{ margin: 0, opacity: 0.85 }}>
                  {a.summary?.length > 200
                    ? a.summary.slice(0, 200) + "..."
                    : a.summary}
                </p>

                <small style={{ opacity: 0.7 }}>
                  Ngày đăng: {new Date(a.published_at).toLocaleString()}
                </small>

                <div>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "8px 12px",
                      border: "1px solid #ddd",
                      borderRadius: 8,
                      textDecoration: "none"
                    }}
                  >
                    Xem chi tiết
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
