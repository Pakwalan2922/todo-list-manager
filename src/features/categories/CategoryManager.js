import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, editCategory, deleteCategory } from './categorySlice';
import { MdDeleteForever, MdEditDocument } from "react-icons/md";

const CategoryManager = () => {
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);
  // ใช้ useSelector hook เข้าถึง categories จาก redux store
  const categories = useSelector(state => state.categories);
  // ใช้ useDispatch hook เข้าถึง dispatch ฟังก์ชันจาก redux store
  const dispatch = useDispatch();

  const handleAddCategory = () => {
    // ถ้า name เป็นค่าว่างหรือมีช่องว่าง ให้ return ออกจากฟังก์ชัน
    if (name.trim() === '') return;
    // ถ้ามีค่า editingId แสดงว่ากำลังแก้ไข category ที่มีอยู่
    if (editingId) {
      // dispatch action editCategory พร้อมข้อมูล id และ name
      dispatch(editCategory({ id: editingId, name }));
      // รีเซ็ต editingId เป็น null
      setEditingId(null);
      // ถ้าไม่มีค่า editingId แสดงว่ากำลังเพิ่ม category ใหม่
    } else {
      // dispatch action addCategory พร้อมข้อมูล id (สร้างจาก Date.now()) และ name
      dispatch(addCategory({ id: Date.now().toString(), name }));
    }
    setName('');
  };

  // ประกาศฟังก์ชัน handleEditCategory เพื่อจัดการการแก้ไข category
  const handleEditCategory = (category) => {
    // ตั้งค่า name เป็น name ของ category ที่กำลังแก้ไข
    setName(category.name);
    // ตั้งค่า editingId เป็น id ของ category ที่กำลังแก้ไข
    setEditingId(category.id);
  };

  // ประกาศฟังก์ชัน handleDeleteCategory เพื่อจัดการการลบ category
  const handleDeleteCategory = (id) => {
    // dispatch action deleteCategory พร้อมข้อมูล id
    dispatch(deleteCategory(id));
  };

  return (
    <div>
      <h2 className="text-[22px] font-bold mb-2">Task Categories</h2>
      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2 w-[50%] rounded-lg"
          placeholder="Category name"
        />
        <button onClick={handleAddCategory} className="bg-[#28C1F8] hover:bg-blue-800 text-white p-2 rounded-full px-4 py-2">
          {editingId ? 'Edit' : 'Add'} Category
        </button>
      </div>
      <ul>
        {categories.map(category => (
          <li key={category.id} className="flex justify-between items-center mb-2">
            <p className="font-bold text-[20px] text-[#222222]">Category Name: <span className='font-medium text-[18px]'>{category.name}</span></p>
            <div className='flex flex-row justify-between items-center'>
              <button onClick={() => handleEditCategory(category)} className="bg-[#28C1F8] hover:bg-[#0D6BFA] p-1 rounded-full px-4 py-2 mr-2 flex flex-row justify-center items-center text-white"><MdEditDocument className='font-poppins font-semibold text-2xl mr-1' />Edit</button>
              <button onClick={() => handleDeleteCategory(category.id)} className="bg-[#F4511E] hover:bg-[#F57C00] p-1 rounded-full px-4 py-2 flex flex-row justify-center items-center text-white"><MdDeleteForever className='font-poppins font-semibold text-2xl mr-1' />Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;