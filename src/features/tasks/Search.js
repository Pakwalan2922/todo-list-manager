import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Search = ({ setFilteredTasks }) => {
  // เก็บค่าข้อความที่กรอกเข้ามาใน input form ช่อง search
  const [searchTerm, setSearchTerm] = useState('');
  // เก็บค่าข้อความที่เลือกตรง category option
  const [selectedCategory, setSelectedCategory] = useState('');
  // เก็บ state ปัจจุบันของ categories จาก redux store
  const categories = useSelector(state => state.categories);
  // เก็บ state ปัจจุบันของ tasks จาก redux store
  const tasks = useSelector(state => state.tasks);

  // เรียกใช้ฟังก์ชันเมื่อมีการคลิกปุ่ม Search
  const handleSearch = () => {
    // ทำการกรอง task ผ่านเงื่อนไขที่กำหนด
    const filtered = tasks.filter(task =>
      // ค้นหาด้วย title ของ task
      (task.title.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '') &&
      // filter task ตาม categoryId
      (task.categoryId === selectedCategory || selectedCategory === '')
    );
    // ตั้งค่า tasks ที่ filter แล้วให้กับ filteredTasks ผ่าน prop setFilteredTasks
    setFilteredTasks(filtered);
  };

  return (
    <div className="mb-4 w-[50%]">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mr-2 rounded-lg px-4 py-2"
        placeholder="Search by title"
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border p-2 mr-2 rounded-lg px-4 py-2"
      >
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
      <button onClick={handleSearch} className="bg-[#28C1F8] hover:bg-[#0D6BFA] text-white p-2 rounded-full px-4 py-2">Search</button>
    </div>
  );
};

export default Search;