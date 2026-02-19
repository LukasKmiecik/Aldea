
async function loadComponent(id, file){
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

loadComponent("header","components/header.html");
loadComponent("footer","components/footer.html");

async function loadStats(){
  try{
    const res = await fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec");
    const data = await res.json();
    document.getElementById("visitCount").innerText = data.total;
    document.getElementById("countryCount").innerText = data.countries;
  }catch(e){
    document.getElementById("visitCount").innerText="--";
    document.getElementById("countryCount").innerText="--";
  }
}

loadStats();
