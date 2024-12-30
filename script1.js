const paragraphs = {
    30: [
        "She opened the door to the garden and breathed in the fresh morning air. The flowers were blooming, and the birds chirped merrily. It was a peaceful moment, just her and nature.",
        "Technology is advancing rapidly, changing the way we communicate and live. With each new development, the possibilities seem endless. Yet, some wonder if we are moving too fast for our own good.",
        "On a quiet street corner, an old man sat, reading the newspaper. The world around him was fast-paced, but he found comfort in the calmness of his routine. Time moved slowly in his small world."
    ],
    60: [
        "Adventure awaits those who dare to step outside their comfort zone. Whether it's exploring new places, meeting new people, or learning a new skill, the world offers endless opportunities. Taking that first step is often the hardest part, but once you do, you begin to see things from a different perspective. Embrace change and growth, and you might just discover something remarkable.",
        "The sky was painted with shades of orange and pink as the sun began to set behind the mountains. The air was cool, and a gentle breeze rustled through the trees. It was a moment of pure serenity. As the day faded into night, the stars slowly appeared, twinkling softly above. For a few moments, everything felt still and peaceful, like time had stopped just for them.",
        "Life is a journey full of unexpected twists and turns. Sometimes, the path is smooth, and other times, it can be bumpy and difficult to navigate. However, it's during these challenges that we learn the most about ourselves. Every experience, whether good or bad, shapes us into who we are meant to become. Embrace the journey, and you'll find strength in the most unlikely places."
    ],
    90: [
        "Summer evenings are a time for reflection and relaxation. As the sun begins to dip below the horizon, the sky fills with vibrant colors, casting a warm glow over the landscape. People gather in parks, enjoying the last rays of light before the cool night air sets in. Some are with friends, chatting and laughing, while others sit alone, taking in the peaceful moment. There's something special about these quiet hours, where time seems to slow down, and everything feels just a little bit more magical.",
        "Traveling allows you to see the world from different perspectives. When you visit new places, you not only explore their beauty but also their culture and people. Each destination has its own unique story to tell, from the food to the architecture to the traditions that have been passed down through generations. The more you travel, the more you realize how vast and diverse the world is. It's a reminder that we are all connected, no matter how far apart we may seem.",
        "Technology has revolutionized the way we live, work, and connect with others. From smartphones to social media, we are more interconnected than ever before. While this has made communication faster and easier, it has also raised concerns about privacy, the spread of misinformation, and the impact of constant connectivity on mental health. As we move forward, it's important to strike a balance between embracing innovation and maintaining meaningful, real-world connections. The challenge will be finding ways to use technology responsibly while protecting our personal well-being."
    ],
    120: [
        "Life is a collection of moments, some small and quiet, others loud and dramatic. It's easy to get caught up in the hustle and bustle, always rushing from one task to the next. Yet, if you take a moment to slow down, you'll notice the beauty in the simplest things-like the first sip of coffee in the morning, the sound of leaves rustling in the wind, or the way the sun sets behind the mountains. These small moments remind us that life isn't just about achieving goals; it's about enjoying the journey along the way. It's about embracing the present, appreciating the little things, and finding meaning in everyday experiences.",
        "The future is full of possibilities, yet it remains uncertain. Every decision we make, every path we choose, shapes what comes next. It's easy to feel overwhelmed by the weight of our choices, but it's important to remember that no one can predict the future with certainty. The key is to stay adaptable and open to change. Embrace new opportunities, learn from your mistakes, and don't be afraid to take risks. The future may not always go as planned, but it's our ability to adapt and keep moving forward that determines how we'll face it. After all, life is about growth, not perfection.",
        "The importance of mental health cannot be overstated. In a world that often prioritizes physical health and external achievements, it's easy to overlook the emotional and psychological aspects of well-being. Yet, mental health affects everything-our relationships, our work, and even our physical health. Taking time to nurture your mental health is as essential as eating well or exercising. This might mean seeking therapy, practicing mindfulness, or simply ensuring that you take regular breaks to recharge. Everyone's journey is different, but understanding the importance of mental health and addressing it with care is crucial for leading a balanced and fulfilling life."
    ]
};
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
    var i=0;
    for(i=0;i<text.length;i++)
    {
        if(i<main.length)
        {
            if(text[i]===main[i])
                corr.innerHTML+=text[i];
            else
            {
                corr.innerHTML+=`<span class='w'><b>${main[i]}</b></span>`;
                err++;
            }
        }
        else
            break;
    }
    if(i<main.length)
        for(var j=i;j<main.length;j++)
            out.innerHTML+=main[j];
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