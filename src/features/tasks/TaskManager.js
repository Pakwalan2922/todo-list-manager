import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask, deleteTask, toggleTaskStatus } from './taskSlice';
import { MdDeleteForever, MdEditDocument, MdChangeCircle } from "react-icons/md";
import Search from './Search';
import Filter from './Filter';

const TaskManager = () => {
  // ใช้ useState เพื่อเก็บ state ภายใน component
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);
  // ใช้ useSelector เพื่อดึงข้อมูล state จาก redux store
  const categories = useSelector(state => state.categories);
  const tasks = useSelector(state => state.tasks);
  // ใช้ useDispatch เพื่อส่ง action ไปยัง redux store
  const dispatch = useDispatch();

  // ใช้ useEffect เพื่ออัพเดต filteredTasks เมื่อ tasks เปลี่ยนแปลง
  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleAddTask = () => {
    // ถ้า 3 เงื่อนไขนี้ เงื่อนไขใดเงื่อนไขหนึ่งเป็นค่าว่าง ให้ฟังก์ชัน handleAddTask หยุดการทำงานและไม่ทำงานโค้ดถัดไป (return)
    if (title.trim() === '' || description.trim() === '' || categoryId.trim() === '') return;
    // ถ้า editingID ไม่เป็นค่าว่าง
    if (editingId) {
      // ให้ส่ง action การแก้ไขไปยัง redux store โดยฟังก์ชัน editTask จาก taskSlice
      dispatch(editTask({ id: editingId, title, description, categoryId, status: 'Doing' }));
      // reset การแก้ไข
      setEditingId(null);
      // กรณี task ไม่มีการแก้ไข
    } else {
      // ให้ส่ง action เพิ่ม task ใหม่ไปยัง redux store โดยฟังก์ชัน addTask
      dispatch(addTask({ id: Date.now().toString(), title, description, categoryId, status: 'Doing' }));
    }
    // แก้ไขหรือเพิ่ม task เสร็จสิ้น ให้ทำการเซ็ตค่า title, description, categoryID เป็นสตริงค่าว่าง เพื่อให้สามารถ แก้ไขหรือเพิ่ม task ใหม่ในครั้งต่อไป
    setTitle('');
    setDescription('');
    setCategoryId('');
  };

  // ฟังก์ชันเมื่อมีการคลิกปุ่ม edit แต่ละ task เพื่อแก้ไขข้อมูล
  const handleEditTask = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setCategoryId(task.categoryId);
    setEditingId(task.id);
  };

  // ฟังก์ชันเมื่อมีการคลิกปุ่ม delete แต่ละ task เพื่อลบ task โดยรับ parameter id ที่ต้องการลบข้อมูลเข้ามา
  const handleDeleteTask = (id) => {
    // ส่ง action ไป redux store เพื่อลบ task ที่มี id ที่ถูกส่งเข้ามาเป็น parameter ออกไป
    dispatch(deleteTask(id));
  };

  // ฟังก์ชันเปลี่ยนสถานะของ task ทัั้ง 3 สถานะ โดยรับ parameter task เพื่ออัพเดตสถานะ
  const handleToggleStatus = (task) => {
    // เช็ค status แล้วเก็บค่าไว้ใน nextStatus ถ้าปัจจุบันเป็น Doing สถานะถัดไปคือ Completed, ถ้าปัจจุบันเป็น Completed สถานะถัดไปคือ Canceled โดยสถานะ default คือ Doing
    const nextStatus = task.status === 'Doing' ? 'Completed' : task.status === 'Completed' ? 'Canceled' : 'Doing';
    // ส่ง action ไปยัง redux store เพื่อเปลี่ยนสถานะ task ผ่าน toggleTaskStatus ที่รับ object ที่มี id และ status ไป
    dispatch(toggleTaskStatus({ id: task.id, status: nextStatus }));
  };

  return (
    <div>
      <h2 className="text-[22px] font-bold mt-[40px] mb-4">Tasks Create</h2>
      <div className="mb-4 flex flex-col w-full xl:w-[50%]">
        <div className='flex flex-col'>
          <label className='text-[14px] font-semibold'>Task Name:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border mb-4 rounded-lg px-4 py-2"
            placeholder="Enter task name"
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-[14px] font-semibold'>Task Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border mb-4 rounded-lg px-4 py-2"
            placeholder="Enter task description"
            rows={4}
            cols={40}
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-[14px] font-semibold'>Task Category:</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="border mb-4 rounded-lg px-4 py-2"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <button onClick={handleAddTask} className="bg-[#28C1F8] hover:bg-[#0D6BFA] text-white rounded-full mb-[40px] px-4 py-2 w-[110px] relative mx-auto">
          {editingId ? 'Edit' : 'Add'} Task
        </button>
      </div>
      <Search setFilteredTasks={setFilteredTasks} />
      <Filter setFilteredTasks={setFilteredTasks} allTasks={tasks} />
      <div className='flex items-center relative mx-0'>
        <ul className='w-full'>
          {filteredTasks.map(task => (
            <li key={task.id} className="flex flex-col mb-4 border rounded-xl leading-7 px-6 py-8">
              <div className='flex flex-col'>
                <p className="font-bold text-[20px] mb-2">Category Name: <span className="font-semibold">{categories.find(c => c.id === task.categoryId)?.name}</span> </p>
                <p className="font-bold text-[20px] mb-2">Task Name: <span className='text-[18px] font-medium'>{task.title}</span></p>
                <p className="font-bold text-[20px] mb-2">Task Description: <span className='text-[18px] font-medium'>{task.description}</span></p>
              </div>
              <div className='flex flex-col xl:flex-row mt-2 mb-0'>
                <div className='flex flex-row items-center mb-2'>
                  <span className={`p-1 ${task.status === 'Doing' ? 'bg-yellow-200 text-[#EF6C00] font-semibold' : task.status === 'Completed' ? 'bg-green-200 text-[#2E7D32] font-semibold' : 'bg-red-200 text-[#C62828] font-semibold'} rounded-xl px-3 mr-2`}>
                    {task.status}
                  </span>
                  <button onClick={() => handleToggleStatus(task)} className="bg-[#28C1F8] hover:bg-[#0D6BFA] p-1 rounded-full px-4 mr-2 flex flex-row justify-center items-center text-white w-[165px]"><MdChangeCircle className='font-poppins font-semibold text-2xl mr-1' />Change Status</button>
                </div>
                <div className='flex flex-row items-center mb-2'>
                  {task.status === 'Doing' && <button onClick={() => handleEditTask(task)} className="bg-[#28C1F8] hover:bg-[#0D6BFA] p-1 rounded-full px-4 mr-2 flex flex-row justify-center items-center text-white"><MdEditDocument className='font-poppins font-semibold text-2xl mr-1' />Edit</button>}
                  <button onClick={() => handleDeleteTask(task.id)} className="bg-[#F4511E] hover:bg-[#F57C00] p-1 rounded-full px-4 flex flex-row justify-center items-center text-white"><MdDeleteForever className='font-poppins font-semibold text-2xl mr-1' />Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskManager;
