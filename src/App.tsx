import { Link, NavLink, Route, Routes } from "react-router-dom";
import WeatherApp from "./components/WeatherApp";
import StudentsApp from "./components/StudentsApp";
import StudentDetail from "./components/StudentDetail";
import NewsApp from "./components/NewsApp";


const navStyle: React.CSSProperties = {
  display: "flex",
  gap: 12,
  padding: 12,
  borderBottom: "1px solid #ddd",
  position: "sticky",
  top: 0,
  background: "#fff",
  zIndex: 1
};

const linkStyle: React.CSSProperties = ({}) as any;

export default function App() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 900, margin: "0 auto" }}>
      <nav style={navStyle}>
        <NavLink to="/" style={({ isActive }) => ({ ...linkStyle, fontWeight: isActive ? 700 : 400 })}>Trang chủ</NavLink>
        <NavLink to="/weather" style={({ isActive }) => ({ fontWeight: isActive ? 700 : 400 })}>Bài 1: Thời tiết</NavLink>
        <NavLink to="/students" style={({ isActive }) => ({ fontWeight: isActive ? 700 : 400 })}>Bài 2: Sinh viên</NavLink>
        <NavLink to="/news" style={({ isActive }) => ({ fontWeight: isActive ? 700 : 400 })}>Bài 3: Tin tức</NavLink>
      </nav>

      <main style={{ padding: 16 }}>
        <Routes>
          <Route
            path="/"
            element={
              <section>
                <h1>TH02 – React + TypeScript</h1>
                <p>Gồm 3 bài: Thời tiết, Danh sách sinh viên, Tin tức.</p>
                
              </section>
            }
          />
          <Route path="/weather" element={<WeatherApp defaultCity="Hanoi" />} />
          <Route path="/students" element={<StudentsApp />} />
          <Route path="/students/:id" element={<StudentDetail />} />
          <Route path="/news" element={<NewsApp />} />
          <Route path="*" element={<p>Không tìm thấy trang.</p>} />
        </Routes>
      </main>
    </div>
  );
}
