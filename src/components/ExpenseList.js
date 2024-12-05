import React from 'react';

const ExpenseList = ({ expenses, deleteExpense }) => {
    return (
        <>
            {expenses.length > 0 ? (
                expenses.map((expense) => (
                    <tr key={expense.id}>
                        <td style={{ textAlign: 'center' }}>{expense.date}</td>
                        <td style={{ textAlign: 'center' }}>{expense.title}</td>
                        <td style={{ textAlign: 'center' }}>$ {expense.amount}</td>
                        <td style={{ textAlign: 'center' }}><button onClick={() => deleteExpense(expense.id)}>del</button></td>
                    </tr>
                ))
            ) : (
                <p>내역이 없습니다.</p>
            )}
        </>
    );
};

export default ExpenseList;