// export const DisplayPriceInRupees = (price:number)=>{
//     return new Intl.NumberFormat('en-IN',{
//         style : 'currency',
//         currency : 'INR'
//     }).format(price)
// }

export const DisplayPriceInRupees = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(price);
};