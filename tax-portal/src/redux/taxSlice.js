import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  income: '',
  investments: '',
  deductions: '',
  otherIncome: '',
  taxableIncome: 0,
  taxPayable: 0
};

const taxSlice = createSlice({
  name: 'tax',
  initialState,
  reducers: {
    updateForm(state, action) {
      state[action.payload.name] = action.payload.value;
    },
    calculateTax(state) {
      const { income, investments, deductions, otherIncome } = state;
      const incomeNum = parseFloat(income) || 0;
      const investmentsNum = parseFloat(investments) || 0;
      const deductionsNum = parseFloat(deductions) || 0;
      const otherIncomeNum = parseFloat(otherIncome) || 0;

      const taxableIncome = incomeNum + otherIncomeNum - (investmentsNum + deductionsNum);
      const taxPayable = taxableIncome > 250000 ? taxableIncome * 0.1 : 0;

      state.taxableIncome = taxableIncome;
      state.taxPayable = taxPayable;
    }
  }
});

export const { updateForm, calculateTax } = taxSlice.actions;
export default taxSlice.reducer;
