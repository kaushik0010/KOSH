import { runMonthlyDeductions } from "../jobs/monthlyDeduction";

runMonthlyDeductions().then(() => {
  console.log("Monthly deduction job complete.");
  process.exit(0);
});