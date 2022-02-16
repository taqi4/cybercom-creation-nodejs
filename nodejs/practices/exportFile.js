const arr = [1,2,3];
export const first = ()=>{
    let [, ,c]=arr;
    console.log(c);
    console.log("from first function");
};
export const second = ()=>{
    console.log("from second function");
};
const third = ()=>{
    console.log("from third function ");
};
export default  third ; 
