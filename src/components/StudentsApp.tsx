import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import type { Student } from "../types";

export default function StudentsApp() {
  const [list, setList] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<Student[]>("https://jsonplaceholder.typicode.com/users")
      .then(res => setList(res.data))
      .catch(() => alert("Lỗi tải dữ liệu"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Danh sách sinh viên</h2>
      {loading ? <p>Đang tải...</p> : (
        <ul>
          {list.map(s => (
            <li key={s.id}>
              <Link to={`/students/${s.id}`}>{s.name}</Link> ({s.email})
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
