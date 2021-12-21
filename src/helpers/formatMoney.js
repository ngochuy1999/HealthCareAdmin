export const formatVnd=(money)=>{
  money=parseInt(money);
  let output = money.toLocaleString('en-US', {style : 'currency', currency : 'VND'});
  return output;
}