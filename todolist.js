const input = document.getElementById("textinput");
const Addbutton = document.getElementById("Addbutton");
const mainContainer = document.getElementById("mainContainer");
const clearAll = document.getElementById("clearAll");

Addbutton.addEventListener('click',function(){

  const paragraph = document.createElement('p');
  paragraph.classList.add('enterPara');
  mainContainer.appendChild(paragraph);

  const edit = document.createElement('button');
  edit.setAttribute('id','editlist');
  edit.innerText = "Edit";
  mainContainer.appendChild(edit);

  const mybutton = document.createElement('button');
  mybutton.setAttribute('id','mybutton');
  mybutton.innerText = "Delete";  
  mainContainer.appendChild(mybutton);

  const newParagraph = document.createElement('newParagraph');
  mainContainer.appendChild(newParagraph);

  paragraph.innerText = input.value;   

 mybutton.addEventListener('click', function(){
 mainContainer.removeChild(paragraph);
 mainContainer.removeChild(mybutton);
 mainContainer.removeChild(edit);
 mainContainer.removeChild(newParagraph);
});

edit.addEventListener('click', function(){

   const editvalue = prompt("Enter Value Here");
   paragraph.innerHTML = editvalue;    
})
});

clearAll.addEventListener('click', function(){

    mainContainer.innerHTML = " ";
    input.innerHTML = " ";
});