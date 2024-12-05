import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import ExpenseLst from './components/ExpenseList';  // MonthFilter.js에 다 포함돼서 ExpenseList.js 별도 필요 없음
import ExpenseForm from './components/ExpenseForm';
import MonthFilter from './components/MonthFilter';  //test
import ExpenseUpdate from './components/ExpenseUpdate';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectMonth, setSelectMonth] = useState(''); //test
  const [editingExpense, setEditingExpense] = useState(null);

  const apiURL = 'http://localhost:5000/expenses';

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(apiURL);
      setExpenses(response.data);
      calculateTotal(response.data);
    } catch (error) {
      console.error('Error fetrching expenses:', error);
    }
  };

  const addExpense = async (newExpense) => {
    try {
      const response = await axios.post(apiURL, {...newExpense, id: Date.now()});
      setExpenses((prevExpenses) => [...prevExpenses, response.data]);
      setTotal((prevTotal) => prevTotal + newExpense.amount)
    } catch (error) {
      console.error('Error adding expense:', error)
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(apiURL + '/' + id);                                                                                                                                         
    const updateExpenses = expenses.filter(expense => expense.id === id);
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    calculateTotal(updateExpenses);
    } catch (error) {
      console.error('Error deleting expense', error)
    }
  };

  const handleEdit = (expense) => {                         // 수정할 항목 설정
    setTotal((prevTotal) => prevTotal - expense.amount)     // 수정하기 전 total 에서 제외
    setEditingExpense(expense); 
  };

  const handleUpdateExpense = async (updatedExpense) => {   
    try {
      const response =  await axios.put(apiURL + '/' + updatedExpense.id, updatedExpense)
      const updatedExpenses = expenses.map((expense) =>
      expense.id === updatedExpense.id ? response.data : expense);
      setExpenses(updatedExpenses);               // axios.put 사용해 json-server 업데이트
      calculateTotal(updatedExpenses);            // total도 다시 계산
      setEditingExpense(null);                    // Edit Expense Form 초기화
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const calculateTotal = (expenses) => {                                                                                                                                                       
    let totalAmount = 0;                                                                                                                   
    for (let i = 0; i < expenses.length; i++) {
      totalAmount += expenses[i].amount;
    }
    setTotal(totalAmount);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    console.log('Updated expenses:', expenses)
  }, [expenses]);

  //GPT
  const monthChange = (event) =>{         //36번째 줄의 onChange={monthChange}
    setSelectMonth(event.target.value);   //select의 값이 바뀔 때마다 monthChange 실행
  };                                      //event.target.value는 select의 value 값을 selectMonth에 저장

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>지출 장부 프로그램</h1>
      
      <table border="1" style={{borderCollapse: 'collapse', width: '100%'}}>

        <caption><h2>Expense List</h2></caption>

        <thead style={{background: 'lightgray'}}>
          <th  style={{width: '10%'}}>
            날짜 &nbsp;
            <select id='month_select' value={selectMonth} onChange={monthChange}>
              <option value=''>전체</option>
              <option value='1'>1월</option>
              <option value='2'>2월</option>
              <option value='3'>3월</option>
              <option value='4'>4월</option>
              <option value='5'>5월</option>
              <option value='6'>6월</option>
              <option value='7'>7월</option>
              <option value='8'>8월</option>
              <option value='9'>9월</option>
              <option value='10'>10월</option>
              <option value='11'>11월</option>
              <option value='12'>12월</option>
            </select>  
          </th><th>사용처</th><th style={{width: '20%'}}>금액</th><th style={{width: '5%'}}>삭제</th><th>수정</th>
        </thead>

        <tbody>
          <MonthFilter 
            expenses={expenses} 
            selectMonth={selectMonth} 
            deleteExpense={deleteExpense}
            handleEdit={handleEdit}  />
        </tbody>

        <tfoot style={{background: 'lightgray'}}>
          <tr><th></th><th>Total</th><th>$ {total}</th><th></th><th></th></tr>
        </tfoot>

      </table>
      
      <br/>
      <hr/>

      <ExpenseForm addExpense={addExpense} />
      <ExpenseUpdate 
        editingExpense={editingExpense} 
        setEditingExpense={setEditingExpense}
        updateExpense={handleUpdateExpense} />
    </div>
  );
}

export default App;
