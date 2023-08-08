import React,{ useState } from "react";

interface Expenses {
  id: number;
  text: string;
  amount: number;
  deleted: boolean;
}

const Form = () => {

  // CLIENT
  const [expenses, setExpenses] = useState<Expenses[]>([]);
  const [inputText, setInputText] = useState('');
  const [inputAmount, setInputAmount] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const handleAddExpenses = () => {
    if (inputText.trim() !== '') {
      const newExpenses: Expenses = {
        id: Date.now(),
        text: inputText,
        amount: inputAmount,
        deleted: false,
      };

      setExpenses([...expenses, newExpenses]);
      setInputText('');
      setInputAmount(0);
      setTotalExpenses(totalExpenses+inputAmount);
      console.log(expenses);
    }
  };

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleInputAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAmount(parseFloat(e.target.value));
  };

  return  (
    <>
      <div className="bg-white min-h-mi d-block w-full md:w-1/2 mx-auto py-8 px-5">
        <div className="p-6 rounded-lg shadow-lg mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Expenses</h1>
          <input
            type="text"
            value={inputText}
            onChange={handleInputTextChange}
            className="w-full text-gray-900 border-gray-200 border-2 p-2 rounded-lg focus:outline-none mb-2"
            placeholder="i.e. Groceries"
          />
          <input
            type="number"
            value={inputAmount}
            onChange={handleInputAmountChange}
            className="w-full text-gray-900 border-gray-200 border-2 p-2 rounded-lg focus:outline-none mb-2"
            placeholder="i.e 50.00"
          />
          <button
            onClick={handleAddExpenses}
            className="w-full w-full content-center bg-blue-500 text-white px-4 rounded-lg py-3 hover:bg-blue-600 focus:outline-none"
          >
            Add
          </button>
        </div>
        {
          expenses.length > 0 ? (
            <div className="w-full">
              <table className="table-auto w-full text-left border-collapse border">
                <thead>
                  <th className="p-3 border">Expenses</th>
                  <th className="p-3 border">Amount</th>
                </thead>
                <tbody>
                  {
                    expenses.map(expense => (
                      <tr>
                        <td className="p-3 border"> {expense.text} </td>
                        <td className="p-3 border"> {expense.amount} </td>
                      </tr>
                  ))}
                  <tr>
                      <td className="p-3 border"><strong>TOTAL</strong></td>
                      <td className="p-3 border"><strong>{totalExpenses}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <></>
          )
        }
      </div>
    </>
  );
};

export default Form;