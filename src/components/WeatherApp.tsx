import { useEffect, useState } from "react";
import axios from "axios";
import type { WttrResponse } from "../types";

type Props = { defaultCity?: string };

export default function WeatherApp({ defaultCity = "Hanoi" }: Props) {
  const [city, setCity] = useState(defaultCity);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tempC, setTempC] = useState<string | null>(null);
  const [desc, setDesc] = useState<string | null>(null);

  async function fetchWeather(targetCity: string) {
    if (!targetCity.trim()) return;
    try {
      setLoading(true); setError(null);
      const url = `https://wttr.in/${encodeURIComponent(targetCity)}?format=j1`;
      const res = await axios.get<WttrResponse>(url);
      const cc = res.data.current_condition?.[0];
      setTempC(cc?.temp_C ?? null);
      setDesc(cc?.weatherDesc?.[0]?.value ?? null);
    } catch {
      setError("Không lấy được dữ liệu thời tiết.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchWeather(defaultCity); }, [defaultCity]);

  return (
    <section>
      <h2>Bài 1: Ứng dụng thời tiết</h2>
      <form onSubmit={(e) => { e.preventDefault(); fetchWeather(city); }} style={{ display: "flex", gap: 8, margin: "12px 0" }}>
        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Nhập tên thành phố" style={{ flex: 1, padding: 8 }} />
        <button type="submit">Xem</button>
      </form>

      {loading && <p>Đang tải...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      {!loading && !error && tempC && (
        <div style={{ padding: 12, border: "1px solid #eee", borderRadius: 8 }}>
          <p><strong>Thành phố:</strong> {city}</p>
          <p><strong>Nhiệt độ:</strong> {tempC} °C</p>
          <p><strong>Tình trạng:</strong> {desc}</p>
        </div>
      )}
    </section>
  );
}
