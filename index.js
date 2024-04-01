document.addEventListener('DOMContentLoaded', function () {
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expenses-list');
  const totalExpensesDisplay = document.getElementById('total-expenses');
  let totalExpenses = 0;

  expenseForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const expenseInput = document.getElementById('expense');
      const amountInput = document.getElementById('amount');
      const categoryInput = document.getElementById('category');

      const expenseName = expenseInput.value;
      const expenseAmount = parseFloat(amountInput.value);
      const expenseCategory = categoryInput.value;

      if (expenseName && !isNaN(expenseAmount) && expenseCategory) {
          addExpense(expenseName, expenseAmount, expenseCategory);
          expenseInput.value = '';
          amountInput.value = '';
          categoryInput.selectedIndex = 0;
      } else {
          alert('Please fill out all fields correctly.');
      }
  });

  function addExpense(name, amount, category) {
      const expenseItem = document.createElement('div');
      expenseItem.classList.add('expense-item');
      expenseItem.innerHTML = `
          <p><span>Name:</span> ${name}</p>
          <p><span>Amount:</span> N${amount.toFixed(2)}</p>
          <p><span>Category:</span> ${category}</p>
          <button class="delete-btn">Delete</button>
      `;
      expenseList.appendChild(expenseItem);
      totalExpenses += amount;
      totalExpensesDisplay.textContent = totalExpenses.toFixed(2);

      // Add event listener to delete button
      const deleteBtn = expenseItem.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', function () {
          deleteExpense(expenseItem, amount);
      });
  }

  function deleteExpense(expenseItem, amount) {
      expenseItem.remove();
      totalExpenses -= amount;
      totalExpensesDisplay.textContent = totalExpenses.toFixed(2);
  }
});
