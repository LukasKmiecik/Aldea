(function(){
  async function includeAll(){
    const nodes=document.querySelectorAll('[data-include]');
    for(const el of nodes){
      const path=el.getAttribute('data-include');
      try{const res=await fetch(path,{cache:'no-cache'});el.innerHTML=await res.text();}catch(e){el.innerHTML='';}
    }
    wireUI();
  }

  function wireUI(){
    const toggle=document.querySelector('[data-nav-toggle]');
    const nav=document.querySelector('[data-nav]');
    if(toggle&&nav){toggle.addEventListener('click',()=>nav.classList.toggle('open'));}

    const lang=document.querySelector('[data-lang]');
    const btn=document.querySelector('[data-lang-btn]');
    if(lang&&btn){
      btn.addEventListener('click',(e)=>{e.stopPropagation();lang.classList.toggle('open');});
      document.addEventListener('click',()=>lang.classList.remove('open'));
    }

    const here=(document.documentElement.getAttribute('data-page')||'').toLowerCase();
    document.querySelectorAll('[data-nav] a[data-page]').forEach(a=>{if(a.getAttribute('data-page')===here)a.classList.add('active');});

    const statsEl=document.querySelector('[data-stats]');
    if(statsEl){
      const url=statsEl.getAttribute('data-stats');
      fetch(url,{cache:'no-cache'}).then(r=>r.json()).then(d=>{
        const total=Number(d.total||0).toLocaleString('pl-PL');
        const countries=Array.isArray(d.countries)?d.countries:[];
        const top=countries.slice(0,5).map(c=>`${c.country} (${c.count})`).join(' · ');
        const updated=d.updated_at?new Date(d.updated_at).toLocaleString('pl-PL'):'';
        const totalNode=document.querySelector('[data-stats-total]');
        const topNode=document.querySelector('[data-stats-top]');
        const upNode=document.querySelector('[data-stats-updated]');
        if(totalNode)totalNode.textContent=total;
        if(topNode)topNode.textContent=top||'—';
        if(upNode)upNode.textContent=updated?`Aktualizacja: ${updated}`:'';
      }).catch(()=>{});
    }

    const links=document.querySelectorAll('.docs-nav a[href^="#"]');
    if(links.length){
      const onScroll=()=>{
        let currentId=null;
        for(const a of links){
          const id=a.getAttribute('href').slice(1);
          const sec=document.getElementById(id);
          if(!sec)continue;
          const r=sec.getBoundingClientRect();
          if(r.top<140)currentId=id;
        }
        links.forEach(a=>{
          const id=a.getAttribute('href').slice(1);
          a.style.background=(id===currentId)?'rgba(121,197,143,.10)':'';
          a.style.color=(id===currentId)?'var(--text)':'';
        });
      };
      document.addEventListener('scroll',onScroll,{passive:true});
      onScroll();
    }
  }

  includeAll();
})();
