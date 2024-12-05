import React, { useState } from 'react';

const ExpenseForm = ({ addExpense }) => {
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');

    const submit = (e) => {
        e.preventDefault();
        if (!date || !title || !amount || !category) {
            alert('모든 필드를 입력하세요.');
            return;
        }

        const newExpense = { date, title, amount: parseFloat(amount), category };
        addExpense(newExpense);
        setDate('');
        setTitle('');
        setAmount('');
        setCategory('');
    };

    return (
        <div>
            <form onSubmit={submit}>
                <fieldset style={{display: 'inline-block'}}>
                    <legend style={{textAlign: 'center'}}><h2>Add Expense</h2></legend>
                    <input
                        type='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)} 
                    />
                    <br/>
                    <input 
                        type='text' 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder='사용처' 
                    />
                    <br/>
                    <input 
                        type='number' 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        placeholder='금액' 
                    />
                    <br/>
                    <input 
                        type='text' 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                        placeholder='분류' 
                    />
                    &emsp;
                    <button type='submit' style={{ fontSize: 15 }}>
                        Add Expense
                    </button>
                </fieldset>
            </form>
        </div>
    );
}

export default ExpenseForm;
