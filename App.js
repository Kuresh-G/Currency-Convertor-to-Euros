const base_url = "https://latest.currency-api.pages.dev/v1/currencies/inr.min.json";
const dropdown = document.querySelectorAll(".dropdown select");
let img = document.querySelectorAll(".dropdown img");
const button = document.querySelector(" form  button");
const fromCurr = document.querySelector(".from  select");
const toCurr = document.querySelector(".to  select ");
let amount = document.querySelector("form input");
const msg = document.querySelector(".msg");
let reset = document.querySelector("#reset")
for(let select of dropdown){
for(let code in countryList){
     let newOption = document.createElement("option");
     newOption.innerText = code;
     newOption.value=code;
     select.append(newOption);
     if(select.name=="from" && code=="USD")
     {
        newOption.selected = "selected";
     }
     if(select.name=="to" && code=="INR")
     {
        newOption.selected=true;
     }
}

select.addEventListener("change",(evt)=>{
    updateflag(evt.target);
});

 const updateflag = (element)=>{
     let currCode = element.value;
      let countryCode = countryList[currCode];
      let newSrcLink = `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
    //   if(element.name=="from"){
    //   img[0].src = newSrcLink;}
    //   else if(element.name=="to"){
    //     img[1].src=newSrcLink
    //   }

    let img = element.parentElement.querySelector("img");
    img.src = newSrcLink;
      

 };

}
// for(let select of )
 async function getCurrency() {
    let promise = await fetch(base_url);
    let data = await promise.json();
    console.log(data);
 }
 let count=0;
 button.addEventListener("click",async (evt) => {
    evt.preventDefault();
    
    let amtval = amount.value;
    if(amtval=="" || amtval==null || amtval=="" || amtval< "1")
        {
            amtval=1;
            amount.value = "1";
        }
    console.log(amtval);
    
     
    // console.log(fromCurr.value);
    // console.log(toCurr.value);
    
    let response  = await fetch(base_url);
    let data = await response.json();
    let from = fromCurr.value;
    let to = toCurr.value;
     console.log(data.eur);
     const temp = data.eur;
     for(let code in temp){
        
        if(code==from.toLowerCase() ){
            if(count>=1){
                 button.disabled=true;
                 reset.style.display="block";
             }
             
             msg.innerHTML+=`${amount.value}  ${from} : ${(temp[code]*amount.value).toFixed(3)} euro <br>`;
             count++;
            
        }
        if(code==to.toLowerCase() ){
            if(count>=1){
                button.disabled=true;
                reset.style.display="block";
             }
            msg.innerHTML+=`${amount.value} ${to} : ${(temp[code]*amount.value).toFixed(3)} euro <br>`;
            count++;
       }
     }
     
 });
