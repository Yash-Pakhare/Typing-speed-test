var paragraphs={};
fetch('./para.json')
    .then(res => res.json())
    .then(data => paragraphs=data)
    .catch(error => console.log("Failed to load json file:", error));
var time=0;
var num=parseInt(Math.random()*10)%3;
var main="";
var err=0,flag=0;

document.getElementById('time').addEventListener('click', (e) => {
    if(e.target.tagName==="INPUT")
        time=Number(e.target.value);
});
// window.addEventListener('keydown', (e) => {
//     var key=document.getElementById(e.code);
//     key.style.translate="5px 5px 5px";
//     key.style.color="var(--c1)";
//     key.style.backgroundColor="var(--c3)";
//     key.style.boxShadow="3px 3px 0 var(--c1)";
// });
// window.addEventListener('keyup', (e) => {
//     var key=document.getElementById(e.code);
//     key.style.translate="0 0 0";
//     key.style.color="var(--c3)";
//     key.style.backgroundColor="var(--c1)";
//     key.style.boxShadow="5px 5px 0 var(--c3)";
// });
function displayText(){
    console.log(paragraphs);
    if(time===0)
    {
        alert("Please select a time duration");
        return;
    }
    document.getElementById('original').innerHTML=paragraphs[time][num];
    main=paragraphs[time][num];
    document.getElementById('text').setAttribute('maxlength', String(main.length));
    document.querySelectorAll('.text').forEach((x) => {x.style.display="block";});
    document.querySelector('.keyboard').style.display="flex";
    document.getElementById('time').style.display="none";
    document.getElementById('text').focus();
}

function startTime(time){
    var time2=time;
    document.getElementById('dispTime').innerHTML=`${time2--}`;
    const display = setInterval(() => {
        document.getElementById('dispTime').innerHTML=`${time2--}`;
    },1000);
    setTimeout(() => {
        document.querySelectorAll('.key').forEach((x) => {
            x.style.translate="0 0 0";
            x.style.color="var(--c3)";
            x.style.backgroundColor="var(--c1)";
            x.style.boxShadow="5px 5px 0 var(--c3)";
        });
        t=document.getElementById('text');
        t.disabled=true;
        clearInterval(display);
        var total=String(t.value).length;
        var speed=parseInt(((total/5)-err)/(time/60));
        if(speed<0)
            speed=0;
        document.getElementById('result').style.display="flex";
        var res=document.getElementById("resultText")
        res.innerHTML=`Your typing speed is: ${speed} WPM`;
    },(time*1000));
}

function fun(e){
    var key=document.getElementById(e.code);
    key.style.translate="0 0 0";
    key.style.color="var(--c3)";
    key.style.backgroundColor="var(--c1)";
    key.style.boxShadow="5px 5px 0 var(--c3)";
    err=0;
    if(flag===0)
        startTime(time);
    flag=1;
    var text=String(document.getElementById("text").value);
    var out=document.getElementById('original');
    out.innerHTML="<span class='c'></span>";
    var corr=document.querySelector('.c');
    var i=0,flag2=0;
    for(i=0;i<text.length;i++)
    {
        if(i<main.length)
        {
            if(text[i]===main[i])
            {
                if(flag2===1)
                    corr.innerHTML+="</b></span>";
                corr.innerHTML+=text[i];
                flag2=0;
            }
            else
            {
                // corr.innerHTML+=`<span class='w'><b>${main[i]}</b></span>`;
                if(flag2===0)
                    corr.innerHTML+=`<span class='w'>${main[i]}</span>`;
                else
                {
                    var l=document.querySelectorAll('.w');
                    l[l.length-1].innerHTML+=main[i];
                }
                err++;
                flag2=1;
            }
        }
        else
            break;
    }
    if(i<main.length)
    {
        if(flag2===1)
            corr.innerHTML+="</b></span>";
        for(var j=i;j<main.length;j++)
            out.innerHTML+=main[j];
    }
}

function press(e){
    var key=document.getElementById(e.code);
    key.style.translate="5px 5px 5px";
    key.style.color="var(--c1)";
    key.style.backgroundColor="var(--c3)";
    key.style.boxShadow="3px 3px 0 var(--c1)";
}

function reset(){
    flag=0;
    err=0;
    time=0;
    num=(num+1)%3;
    document.getElementById('time').style.display="flex";
    document.getElementById('original').innerHTML="";
    document.getElementById('text').disabled=false;
    document.getElementById('text').value="";
    document.getElementById('text').setAttribute('maxlength', "0");
    document.querySelectorAll('.text').forEach((x) => {x.style.display="none";});
    document.querySelector('.keyboard').style.display="none";
    document.getElementById('dispTime').innerHTML="Start typing";
    document.getElementById('result').style.display="none";
    document.querySelectorAll('.opt').forEach((x) => {
        if(x.checked===true)
            x.checked=false;
    });
}