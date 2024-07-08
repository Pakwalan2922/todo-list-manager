// ใช้ createSlice จาก redux toolkit เพื่อสร้าง slice สำหรับจัดการ state ของ task
import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  // กำหนด state เริ่มต้นเป็น array ว่าง
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      // เพิ่ม task ใหม่ที่ถูกส่งมาผ่าน action.payload เข้าไปไว้ใน state ปัจจุบัน
      state.push(action.payload);
    },
    editTask: (state, action) => {
      // หา index ของ task ที่ต้องการแก้ไขโดยใช้ action.payload.id
      const index = state.findIndex(task => task.id === action.payload.id);
      // เช็คค่า index ใน reducer ว่าเจอข้อมูลที่ต้องการหรือไม่ก่อนทำการแก้ไข state ที่เกี่ยวข้องกับข้อมูลใน array
      if (index !== -1) {
        // อัพเดตข้อมูล task ใน state ตามที่กำหนดใน action.payload
        state[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      // คืนค่า state ที่มี task ทั้งหมดยกเว้น task ที่มี id ตรงกับ action.payload ให้ทำการลบออก
      return state.filter(task => task.id !== action.payload);
    },
    toggleTaskStatus: (state, action) => {
      // หา index ของ task ที่ต้องการเปลี่ยนสถานะโดยใช้ action.payload.id
      const index = state.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        // อัพเดต status ของ task ใน state ที่ index นั้นเป็น action.payload.status
        state[index].status = action.payload.status;
      }
    },
  },
});

export const { addTask, editTask, deleteTask, toggleTaskStatus } = taskSlice.actions;
export default taskSlice.reducer;