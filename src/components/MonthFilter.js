import React from 'react';
const MonthFilter = ({expenses, selectMonth, deleteExpense, handleEdit}) => {   //expenses: 전체 배열, selectMonth: 필터 배열, deleteExpense: 삭제 함수

    const filteredExpenses = selectMonth                            //if selectMonth가 선택되면
    ? expenses.filter((expense) => {                                //expense 배열을 돌아서
        const expenseMonth = new Date(expense.date).getMonth() + 1; //expense date 값 중 월만 추출. 단, getMonth()는 1을 더해줘야 함
        return String(expenseMonth) === selectMonth;                //위의 월과 선택한 월을 비교
      })                                                            //해서 일치하는 것만 expense return
    : expenses;                                                     //일치하지 않으면 expenses(전체) return

    // value 값은 문자열
    // + 1을 해주기 위해서는 정수형이어야 하기 때문에 new Date 必 (GPT)
    // selectMonth 값 역시 value이기 때문에 문자열과 비교하기 위해선 다시 String로 문자열로 만들기 必

    //test 가볍게
    const textpluse = selectMonth !== ''
    ? selectMonth + "월"
    : "전체"

    return (
        <>
            {filteredExpenses.length > 0?(
            filteredExpenses.map((expense) => (                    //filteredExpenses의 expense값 하나씩 출력
                <tr key={expense.id}>
                    <td style={{ textAlign: 'center' }}>{expense.date}</td>
                    <td style={{ textAlign: 'center' }}>{expense.title}</td>
                    <td style={{ textAlign: 'center' }}>$ {expense.amount}</td>
                    <td style={{ textAlign: 'center' }}><button onClick={() => deleteExpense(expense.id)}>del</button></td>
                    <td style={{ textAlign: 'center' }}><button onClick={() => handleEdit(expense)}>Edit</button></td>
                </tr>
            ))
        ):(
            <tr><td colSpan={'4'} style={{textAlign: 'center'}}>{textpluse} 지출 내역이 없습니다</td></tr>
        )}
        </>
    );
};

export default MonthFilter;