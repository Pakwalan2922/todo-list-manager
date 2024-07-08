import React from 'react';

// component Filter มีการรับ props (setFilteredTasks, allTasks) เข้ามา
const Filter = ({ setFilteredTasks, allTasks }) => {
  // ฟังก์ชัน handleFilter สำหรับ filter งานตามสถานะ
  const handleFilter = (status) => {
    // filter งานจาก allTasks ที่มี status ตรงกับพารามิเตอร์ status
    const filtered = status === 'All' ? allTasks : allTasks.filter(task => task.status === status);
    // set task ที่ถูก filter ผ่านฟังก์ชัน setFilteredTasks
    setFilteredTasks(filtered);
  };

  return (
    <div className="mb-5">
      <p className='text-[22px] font-bold pt-4 pb-2 uppercase'>Status Filter:</p>
      <button onClick={() => handleFilter('All')} className="bg-[#28C1F8] text-[#0D6BFA] font-semibold px-4 py-2 mr-2 rounded-xl">All</button>
      <button onClick={() => handleFilter('Doing')} className="bg-yellow-200 text-[#EF6C00] font-semibold px-4 py-2 mr-2 rounded-xl">Doing</button>
      <button onClick={() => handleFilter('Completed')} className="bg-green-200 text-[#2E7D32] font-semibold px-4 py-2 mr-2 rounded-xl">Completed</button>
      <button onClick={() => handleFilter('Canceled')} className="bg-red-200 text-[#C62828] font-semibold px-4 py-2 rounded-xl">Canceled</button>
    </div>
  );
};

export default Filter;