let navbtns=document.getElementsByClassName("nav-btn")[0]
let navbmo=document.getElementsByClassName("nav-mobile")[0]
let slides=document.getElementsByClassName("contain")[0]
let btnSlide=document.getElementsByClassName("show_nav_mob")[0]
let last=0;
let las=0;
//Gestion ade la navigation
for(let i=1;i<6;i++){
    slides.children[i].style.opacity=0
}
for(let i=0;i<navbtns.childElementCount;i++){
    navbtns.children[i].addEventListener("click",(e)=>{
        console.log(e);
        e.stopPropagation();
        for(let i=0;i<navbtns.childElementCount;i++){
            slides.children[i].style.opacity=0
            slides.children[i].style.transition="0.8s all ease-in-out 0.4s"
            slides.children[last].style.transition="0.4s all ease-in-out"
        }
        slides.children[i].style.opacity=1
        last=i;
    })
}
for(let i=3;i<navbmo.childElementCount-1;i++){
    navbmo.children[i].addEventListener("click",(e)=>{
        
        for(let i=0;i<navbtns.childElementCount;i++){
            slides.children[i].style.opacity=0
            slides.children[i].style.transition="0.8s all ease-in-out 0.4s"
            slides.children[las].style.transition="0.4s all ease-in-out"
        }
        slides.children[i-3].style.opacity=1
        las=i-3;
    })
}
btnSlide.addEventListener("click",function(){
    if(btnSlide.children[1].style.opacity=="1"){
        btnSlide.children[0].style.transform="rotate(45deg)"
        btnSlide.children[1].style.opacity="0"
        btnSlide.children[2].style.transform="rotate(-45deg)"
        btnSlide.children[2].style.marginTop="7.5px"
        navbmo.style.display="flex"
    }else{
        btnSlide.children[0].style.transform="rotate(0)"
        btnSlide.children[1].style.opacity="1"
        btnSlide.children[2].style.transform="rotate(0)"
        btnSlide.children[2].style.marginTop="3px"
        navbmo.style.display="none"
    }
})

//Animation de la barre de progression 
setInterval(function() {
    if(slides.children[3].style.opacity==1){
        e=document.getElementById("skills")
        e.children[0].children[1].children[0].setAttribute("class","progress_bar")
        e.children[1].children[1].children[0].setAttribute("class","progress_bar1")
        e.children[2].children[1].children[0].setAttribute("class","progress_bar2")
        e.children[3].children[1].children[0].setAttribute("class","progress_bar3")
        
    }else{
        e=document.getElementById("skills")
        for (let i = 0; i < 4; i++) {
            e.children[i].children[1].children[0].setAttribute("class","b")
        }
    }
},0.1);
//Animation des labels dans le formulaire
let show=(n)=>{
  let labs=document.querySelectorAll("label")
  for (let i = 0; i < 3; i++) {
    labs[i].style.transition="400ms all ease-in"
    if(i==n){
        labs[i].style.opacity=1
    }else{
        labs[i].style.opacity=0 
    }
  }
}
let xmlhttp = new XMLHttpRequest();

    
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            fetchData()
        }
    };
    xmlhttp.open("GET", "data.xml", true);
    xmlhttp.send()

function fetchData() {
    let i;
    let xmlDoc = xmlhttp.responseXML;
    let table = "";
    let x = xmlDoc.getElementsByTagName("MESSAGE");
    for (i = x.length-1; i>=0 ; i--) {
        table += 
        "<tr style='margin-top:10px;font-weight:bold'><td>" +
            x[i].getElementsByTagName("NOM")[0].childNodes[0].nodeValue +"<span style='font-size:0.7em;font-weight:lighter;margin-left:10px;color:gray'>"+x[i].getElementsByTagName("EMAIL")[0].childNodes[0].nodeValue+"</span>"+
        "</td></tr><tr><td style='padding-left:2px; font-size:0.9em'>" +
        x[i].getElementsByTagName("CONTENU")[0].childNodes[0].nodeValue +"<span style='margin-left:15px;color:#04b4e0f3' onclick='editMessage("+x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue+")'>"+"Modifier</span>"+"<span style='margin-left:15px;color:#04b4e0f3' onclick='deleteMessage("+x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue+")'>"+"Supprimer</span>"+
        "</td></tr>";

    }
    document.getElementById("data").innerHTML = table;
}
function editMessage(id) {
    let xmlDoc = xmlhttp.responseXML;
    let messages = xmlDoc.getElementsByTagName("MESSAGE");
    let message;

    for (i = 0; i < messages.length; i++) {
        if (messages[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue == id) {
            message = messages[i];
        }
    }
    let msg= message.getElementsByTagName("CONTENU")[0].childNodes[0].nodeValue;
    let new_value=prompt("Entrer le nouveau message",msg)
    message.getElementsByTagName("CONTENU")[0].childNodes[0].nodeValue = new_value;
   fetchData()
   saveBook()
}
function deleteMessage(id){
    let xmlDoc = xmlhttp.responseXML;
    let messages = xmlDoc.getElementsByTagName("MESSAGE");
    let message;

    for (i = 0; i < messages.length; i++) {
        if (messages[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue == id) {
            message = messages[i];
        }
    }
    xmlDoc.documentElement.removeChild(message);
    fetchData();
    saveBook();
}
function create(){
    let xmlDoc = xmlhttp.responseXML;
    let x = xmlDoc.getElementsByTagName("MESSAGES");
    e=xmlDoc.createElement("MESSAGE");
    i=xmlDoc.createElement("ID");
    f=xmlDoc.createElement("NOM");
    G=xmlDoc.createElement("EMAIL");
    H=xmlDoc.createElement("CONTENU");
    x[0].appendChild(e);
    e.append(i)
    e.appendChild(f);
    e.appendChild(G);
    e.appendChild(H);
    let a = xmlDoc.getElementsByTagName("MESSAGE");
    a[a.length-1].getElementsByTagName("ID")[0].textContent=a.length
    a[a.length-1].getElementsByTagName("NOM")[0].textContent=document.getElementById("full-name").value
    a[a.length-1].getElementsByTagName("EMAIL")[0].textContent=document.getElementById("email").value
    a[a.length-1].getElementsByTagName("CONTENU")[0].textContent=document.getElementById("message_content").value
    fetchData()
    saveBook()
    return false
}
function makeTextFile (text) {
    let textFile = null;
    let data = new Blob([text], { type: 'text/plain' });

    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
};

function saveBook() {                
    let create = document.getElementById('btnSave');

    let link = document.createElement('a');
    link.setAttribute('download', 'data.xml');
    
    const s = new XMLSerializer();

    link.href = makeTextFile(s.serializeToString(xmlhttp.responseXML));
    document.body.appendChild(link);

    window.requestAnimationFrame(function () {
        let event = new MouseEvent('click');
        link.dispatchEvent(event);
        document.body.removeChild(link);
    });
}

//Checker
document.getElementById("full-name").addEventListener("change",(e)=>{
    let input;
    if(document.getElementById("full-name").value.split(" ").join("").length<2){
        input=false;
        document.getElementsByClassName("send")[0].setAttribute("disabled","disabled")
        document.getElementById("full-name").classList.add("error")
        document.getElementById("full-name").style.border="2px solid red"
        document.getElementById("full-name-label").style.color="red"
        window.setTimeout(() => {
            document.getElementById("full-name").classList.remove("error")
             
        }, 1000);
        document.getElementById("msg_error").textContent="Le nom doit comporter deux caractères minimum"
    }
    else{
        input=true
        document.getElementsByClassName("send")[0].removeAttribute("disabled","false")
        document.getElementById("msg_error").textContent=""
        document.getElementById("full-name").style.border="2px solid green" 
        document.getElementById("full-name-label").style.color="green"
    }
})
document.getElementById("email").addEventListener("change",(e)=>{
    let validateEmail=/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    let validate=false
    validate= validateEmail.test(document.getElementById("email").value)
    if(validate==false){
        
        document.getElementById("email").classList.add("error")
        document.getElementById("email").style.border="2px solid red"
        document.getElementById("email-label").style.color="red"
        window.setTimeout(() => {
            document.getElementById("email").classList.remove("error")
             
        }, 1000);
        document.getElementById("msg_error").textContent="Format invalide."
    }
    else{
        document.getElementById("msg_error").textContent=""
        document.getElementById("email").style.border="2px solid green" 
        document.getElementById("email-label").style.color="green"
    }
})
document.getElementById("message_content").addEventListener("change",(e)=>{
    let message_content;
    if(document.getElementById("message_content").value.length<4){
        message_content=false;
        document.getElementById("message_content").classList.add("error")
        document.getElementById("message_content").style.border="2px solid red"
        document.getElementById("message_content_label").style.color="red"
        window.setTimeout(() => {
            document.getElementById("message_content").classList.remove("error")
             
        }, 1000);
        document.getElementById("msg_error").textContent="Le commentaire doit faire un minimum de quatre mots"
    }
    else{
        message_content=true
        document.getElementById("msg_error").textContent=""
        document.getElementById("message_content").style.border="2px solid green" 
        document.getElementById("message_content_label").style.color="green"
    }
})


let slide=0;
document.getElementsByClassName("fleche")[0].addEventListener("click",function(){
    slide--;
    if(slide<0){
        slide=1;
    }
    for(let i=0;i<2;i++){
        if(slide==i){
            document.getElementsByClassName("image_slide")[i].style.display="block"
        }
        else{
            document.getElementsByClassName("image_slide")[i].style.display="none"
        }
    }
    })
    document.getElementsByClassName("fleche")[1].addEventListener("click",function(){
        slide++;
        if(slide>1){
            slide=0;
        }
        for(let i=0;i<2;i++){
            if(slide==i){
                document.getElementsByClassName("image_slide")[i].style.display="block"
            }
            else{
                document.getElementsByClassName("image_slide")[i].style.display="none"
            }
        }
        })
let slide2=2;
document.getElementsByClassName("fleche")[2].addEventListener("click",function(){
    slide2--;
    if(slide2<2){
        slide2=3;
    }
    for(let i=2;i<4;i++){
        if(slide2==i){
            document.getElementsByClassName("image_slide")[i].style.display="block"
        }
        else{
            document.getElementsByClassName("image_slide")[i].style.display="none"
        }
    }
    })
    document.getElementsByClassName("fleche")[3].addEventListener("click",function(){
        slide2++;
        if(slide2>3){
            slide2=2;
        }
        for(let i=2;i<4;i++){
            if(slide2==i){
                document.getElementsByClassName("image_slide")[i].style.display="block"
            }
            else{
                document.getElementsByClassName("image_slide")[i].style.display="none"
            }
        }
        })

//Slide achivments
document.getElementsByClassName("fleche-slide")[0].addEventListener("click",function(){
    document.getElementsByClassName("achivements")[0].style.transform="translateX(-57%)"
})
document.getElementsByClassName("fleche-slide-back")[0].addEventListener("click",function(){
    document.getElementsByClassName("achivements")[0].style.transform="translateX(-57%)"
})
document.getElementsByClassName("fleche-slide")[1].addEventListener("click",function(){
    document.getElementsByClassName("achivements")[0].style.transform="translateX(0px)"
})
document.getElementsByClassName("fleche-slide-back")[1].addEventListener("click",function(){
    document.getElementsByClassName("achivements")[0 ].style.transform="translateX(0px)"
})