export const loadState = () => {
  try {
    // ดึงข้อมูลที่เก็บไว้ใน local storage ภายใต้คีย์ 'state'
    const serializedState = localStorage.getItem('state');
    // เช็คข้อมูลที่เก็บไว้จากคีย์ 'state' ถ้าไม่มีข้อมูลที่เก็บไว้ใน local storage
    if (serializedState === null) {
      // คืนค่า undefined ให้ redux store ใช้ค่าเริ่มต้นที่กำหนดไว้ใน reducers
      return undefined;
    }
    // ถ้ามีข้อมูล ให้แปลงข้อมูลจาก JSON string กลับเป็น JavaScript object และคืนค่านั้น
    return JSON.parse(serializedState);
    // หากเกิดข้อผิดพลาดใดๆ ระหว่างการดึงข้อมูลหรือแปลงข้อมูล จะคืนค่า undefined
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    // แปลง state จาก JavaScript object เป็น JSON string
    const serializedState = JSON.stringify(state);
    // บันทึกข้อมูล JSON string ลงใน local storage ภายใต้คีย์ 'state'
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};