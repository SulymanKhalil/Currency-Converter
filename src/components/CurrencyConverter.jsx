import { useState } from "react";
import { useEffect } from "react";

const CurrencyConverter = () => {
   const [amount, setAmount] = useState("")
   const [from, setFrom] = useState("USD")
   const [to, setTo] = useState("PKR")
   const [currency, setCurrency] = useState([])
   const [countryMap, setCountryMap] = useState({})
   const [rate, setRate] = useState(0);
   const [converted, setConverted] = useState("");

   useEffect(() => {
      fetch("https://api.exchangerate-api.com/v4/latest/USD")
         .then(res => res.json())
         .then(data => {
            const allCurrencies = Object.keys(data.rates);
            const map = {}
            allCurrencies.forEach(code => {
               map[code] = code.slice(0, 2)
            });
            setCountryMap(map)
            setCurrency(allCurrencies)
         })
         .catch(err => console.error("Error fetching currencies", err))
   }, [])

   useEffect(() => {
      if (from && to) {
         fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
            .then((res) => res.json())
            .then((data) => {
               const newRate = data.rates[to];
               setRate(newRate)
            })
            .catch((err) => console.error("Error fetching rate", err))
      }
   }, [from, to])

   useEffect(() => {
      if (amount && rate) {
         setConverted((amount * rate).toFixed(2))
      }
      if(!amount){
         setConverted("")
      }
   }, [amount, rate])

   return (
      <div className="max-w-md mx-auto mt-10 bg-white rounded-2xl shadow-md border border-gray-100 p-6">
         <div className="mb-5">
            <p className="text-gray-600 mb-1">Amount</p>
            <div className="flex items-center bg-gray-50 rounded-xl px-3 py-2 shadow-inner">
               <img src={`https://flagsapi.com/${countryMap[from]}/flat/32.png`} alt="flag" className="rounded-sm" />
               <select
                  className="ml-2 bg-transparent text-gray-700 text-sm focus:outline-none"
                  name="selectCurrency"
                  id="selectCurrency" value={from}
                  onChange={((e) => setFrom(e.target.value))}
               >
                  {currency.map((curr) => (
                     <option key={curr} value={curr}>{curr}</option>
                  ))}
               </select>
               <input
                  type="number"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={((e) => setAmount(e.target.value))}
                  className="w-full bg-transparent text-right focus:outline-none text-gray-700 text-sm"
               />
            </div>
         </div>
         <div className="flex justify-center my-3 mb-6 relative">
            <hr className="w-full border-gray-200" />
            <i class="fa-solid fa-right-left fa-rotate-90 text-indigo-500 absolute bg-white px-2 text-sm"></i>
         </div>
         <div className="mb-5">
            <p className="text-gray-600 mb-1">To Convert</p>
            <div className="flex items-center bg-gray-50 rounded-xl px-3 py-2 shadow-inner">
               <img src={`https://flagsapi.com/${countryMap[to]}/flat/32.png`} alt="flag" className="rounded-sm" />
               <select
                  name="convertCurrency"
                  id="convertCurrency"
                  value={to}
                  onChange={((e) => setTo(e.target.value))}
                  className="ml-2 bg-transparent text-gray-700 text-sm focus:outline-none "
               >
                  {currency.map((curr) => (
                     <option key={curr} value={curr}>{curr}</option>
                  ))}
               </select>
               <input
                  type="number"
                  placeholder="Converted Amount"
                  value={converted}
                  className="w-full text-right bg-transparent focus:outline-none text-gray-700 text-sm"
                  readOnly
               />
            </div>
         </div>
         <div className="text-center">
            <p className="text-xs text-gray-500">Indicative Exchange rate</p>
            <p className="text-sm font-semibold txt-gray-700 mt-1">1 {from} = <span className="text-indigo-500">{rate ? rate.toFixed(2) : "..."}</span> {to}</p>
         </div>
      </div>
   )
}

export default CurrencyConverter;