import React, { useState, useEffect } from 'react';

const ExpenseUpdate = ({ editingExpense, setEditingExpense, updateExpense}) => {

  const [updatedExpense, setupdatedExpense] = useState(editingExpense);

  useEffect(() => {
    setupdatedExpense(editingExpense);
  }, [editingExpense]);
   
  const handleUpdate = (e) => {
    e.preventDefault();
    updateExpense(updatedExpense);
  }
    return (                    // MonthFilter 재사용
        <div>
            {editingExpense && (
                <form onSubmit={handleUpdate}>
                <fieldset style={{display: 'inline-block'}}>
                    <legend style={{textAlign: 'center'}}><h2>Edit Expense</h2></legend>
                    <input
                        type='date'
                        value={editingExpense.date}
                        onChange={(e) => 
                            setEditingExpense({...editingExpense, date: e.target.value})
                        } 
                    />
                    <br/>
                    <input 
                        type='text' 
                        value={editingExpense.title} 
                        onChange={(e) => 
                            setEditingExpense({...editingExpense, title: e.target.value})
                        } 
                        placeholder='사용처' 
                    />
                    <br/>
                    <input 
                        type='number' 
                        value={editingExpense.amount} 
                        onChange={(e) => 
                            setEditingExpense({...editingExpense, amount: parseFloat(e.target.value)})
                        } 
                        placeholder='금액' 
                    />
                    <br/>
                    <input 
                        type='text' 
                        value={editingExpense.category} 
                        onChange={(e) => 
                            setEditingExpense({...editingExpense, category: e.target.value})
                        } 
                        placeholder='분류' 
                    />
                    &emsp;
                    <button type='submit' style={{ fontSize: 15 }}>
                        Update
                    </button>
                    <button type='button' onClick={() => setEditingExpense(null)}>Cancel</button>
                </fieldset>
            </form>
            )}
        </div>
    )
}

export default ExpenseUpdate;