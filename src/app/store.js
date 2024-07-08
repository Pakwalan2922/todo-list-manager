import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/categories/categorySlice';
import taskReducer from '../features/tasks/taskSlice';
import { loadState, saveState } from '../utils/localStorage';

// ดึงข้อมูล state ที่บันทึกไว้ใน local storage มาเป็นค่าเริ่มต้นของ redux store
const preloadedState = loadState();

export const store = configureStore({
  // ใช้ configureStore สร้าง redux store โดยระบุ reducers ที่จะใช้จัดการ state ของ categories และ tasks
  reducer: {
    categories: categoryReducer,
    tasks: taskReducer,
  },
  // ตั้งค่าให้ store เพื่อให้ store ใช้ state ที่โหลดมาจาก local storage เป็นค่าเริ่มต้น
  preloadedState,
});

store.subscribe(() => {
  // เรียกใช้ saveState ใน callback function เพื่อบันทึก state ปัจจุบันของ categories และ tasks ลงใน local storage
  saveState({
    categories: store.getState().categories,
    tasks: store.getState().tasks,
  });
});