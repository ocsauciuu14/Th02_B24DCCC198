import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import type { Student } from "../types";

export default function StudentDetail() {
  const { id } = useParams();
  const [stu, setStu] = useState<Student | null>(null);

  useEffect(() => {
    axios.get<Student>(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => setStu(res.data));
  }, [id]);

  if (!stu) return <p>Đang tải...</p>;

  return (
    <section>
      <h2>Chi tiết sinh viên</h2>
      <p><Link to="/students">← Quay lại</Link></p>
      <p>Họ tên: {stu.name}</p>
      <p>Email: {stu.email}</p>
      <p>ID: {stu.id}</p>
    </section>
  );
}
