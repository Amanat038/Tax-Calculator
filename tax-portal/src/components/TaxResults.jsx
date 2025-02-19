import axios from "axios";
import React, { useEffect, useState } from "react";

const TaxResults = ({result}) => {
   console.log("result",result)
   return (
      <>
     
      <div className="max-w-lg p-6 mx-auto mt-6 bg-white rounded-lg shadow-lg">
         
         <h2 className="mb-4 text-xl font-semibold text-center">
            Tax Calculation Results
         </h2>

         
         <div className="space-y-4">
            <div className="flex justify-between">
               <span className="font-medium">
                  Taxable Income: ₹{result.taxableIncome}
               </span>
            </div>

            <div className="flex justify-between">
               <span className="font-medium">Tax Payable:₹{result.taxPayable}</span>
            </div>
         </div>
        
      </div>
   
      </>
   );
};

export default TaxResults;
