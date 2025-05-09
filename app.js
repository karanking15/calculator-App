let result=0;
let input='0';
let operator=null;
let buttons=document.querySelector('.buttons');
let inputP=document.querySelector('.calculator .result .input p');

buttons.addEventListener("click",(event)=>
{
    let target = event.target;

    // If the clicked element is an icon inside a button, use the button as the target
    if (target.tagName.toLowerCase() === 'i') {
        target = target.parentElement;
    }
    
    if(target.id==="c")
    {
        inputP.innerText=0;
        input='0';
        result=0;
        operator=null;
    }

    else if(target.id==="back_space")
    {
        let n=input.length;
        input=input.slice(0,n-1);
        if(input==='') input='0';
        inputP.innerText=input;
    }

    else if(target.id==='equals_to')
    {
        result=calculate(input);
        input=result.toString();
        inputP.innerText=input;
    }

    else
    {
        if(target.classList.contains('number'))
        {
            if (input==='0') input=target.innerText;
            else input+=target.innerText;
        }

        else if(target.classList.contains('operator'))
        {
            if(target.id==='plus') input+='+';
            else if(target.id==='minus') input+='-';
            else if(target.id==='multiply') input+='*';
            else if(target.id==='divide') input+='/';
            else if(target.id==='percent') input+='%';
        }
        inputP.innerText=input;
    }
});


function calculate(input)
{
    console.log(input);

    const operatorset=new Set();
    operatorset.add('+');
    operatorset.add('-');
    operatorset.add('*');
    operatorset.add('/');
    operatorset.add('%');

    let currRes=0;
    let i=0,n=input.length;

    let operator='+';
    let num=0;
    while(i<n)
    {      
        if(operatorset.has(input[i]))
        {
            operator=input[i];
            i++;
            num=0;
            continue;
        }

        let temp='';
        while(i<n && !operatorset.has(input[i]))
        {
            temp+=input[i];
            num=Number(temp);
            i++;
        }
        
        if(operator!=null)
        {
            currRes=performOperation(currRes,operator,num);
            num=0;
            operator=null;
        }
    }
    return currRes;
}

function performOperation(num1,operator,num2)
{
        if(operator==='+')
        {
            return num1+num2;
        }
        else if(operator==='-')
        {
            return num1-num2;
        }
        else if(operator==='/')
        {
            return num1/num2;
        }
        else if(operator==='*')
        {
            return num1*num2;
        }
        else if(operator==='%')
        {
            return num1*(num2/100);
        }
}