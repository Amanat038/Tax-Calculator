import React, { useEffect, useState } from "react";
import axios from "axios";
import TaxResults from "./TaxResults";
import { v4 as uuidv4 } from "uuid";

const TaxForm = () => {
   const [formData, setFormData] = useState({
      income: "",
      investments: "",
      deductions: "",
      otherIncome: "",
   });
   const [result, setResult] = useState(null);
   const [userId, setUserId] = useState(localStorage.getItem("userId") || "");

   useEffect(() => {
      if (!userId) {
         const newUserId = uuidv4();
         localStorage.setItem("userId", newUserId);
         setUserId(newUserId);
      }
   }, [userId]);

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      
      try {
         await axios.post("https://tax-calculator-3qou.onrender.com", {
            userId,
            ...formData,
         });

         const res = await axios.get("https://tax-calculator-3qou.onrender.com", {
            params: { userId },
         });

         setResult(res.data);
      } catch (error) {
         console.error("Error saving data:", error);
      }
   };

   return (
      <div className="max-w-lg p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg">
         <h2 className="mb-6 text-2xl font-semibold text-center">
            Tax Calculate Portal
         </h2>

         <form onSubmit={handleSubmit} className="space-y-4">
            <div>
               <label className="block text-sm font-medium text-gray-700">
                  Annual Income
               </label>
               <input
                  type="number"
                  name="income"
                  onChange={handleChange}
                  placeholder="Enter your annual income "
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                  required
               />
            </div>

            <div>
               <label>Investments (80c, 80D, etc.)</label>
               <input
                  type="number"
                  name="investments"
                  placeholder="Enter your investments"
                  required
                  onChange={handleChange}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
               />
            </div>
            <div>
               <label>Other Deductions (HRA, LTA, etc.)</label>
               <input
                  type="number"
                  name="deductions"
                  placeholder="Enter other deductions"
                  required
                  onChange={handleChange}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
               />
            </div>

            <div>
               <label>Income from Other Sources</label>
               <input
                  type="number"
                  name="otherIncome"
                  placeholder="Enter income from other sources"
                  required
                  onChange={handleChange}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
               />
            </div>
            <button
               type="submit"
               className="w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
               Calculate Tax
            </button>
         </form>

         {result && (
            <div className="w-full p-6 border-t border-gray-200 md:w-1/2 md:border-t-0 md:border-l">
               <TaxResults result={result} />{" "}
            </div>
         )}
      </div>
   );
};

export default TaxForm;
