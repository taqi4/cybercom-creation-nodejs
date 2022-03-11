var list = [10, 20, 60, 30, 54, 39];
console.log(sum(list));

function sum (list){
    let sum=0;
    list.forEach(element => {
        if(Number(element) ){
            sum+=Number(element);
        }
    });
    return sum;
}