// ใช้ createSlice จาก redux toolkit เพื่อสร้าง slice สำหรับจัดการ state ของ categories
import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'categories',
  // กำหนด state เริ่มต้นเป็น array ว่าง
  initialState: [],
  reducers: {
    addCategory: (state, action) => {
      // เพิ่ม category ใหม่ลงใน state โดยใช้ action.payload
      state.push(action.payload);
    },
    editCategory: (state, action) => {
      // ค้นหา index ของ category ที่ต้องการแก้ไขจาก state โดยใช้ id ที่อยู่ใน action.payload
      const index = state.findIndex(category => category.id === action.payload.id);
      if (index !== -1) {
        // ถ้าพบ category ที่ต้องการแก้ไขใน state, ทำการอัพเดท category ด้วยข้อมูลใหม่จาก action.payload
        state[index] = action.payload;
      }
    },
    deleteCategory: (state, action) => {
      // return category ทั้งหมดที่มี id ไม่ตรงกับ id ใน action.payload ซึ่งเป็นการลบ category ที่มี id ตรงกันออกจาก state
      return state.filter(category => category.id !== action.payload);
    },
  },
});

export const { addCategory, editCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;