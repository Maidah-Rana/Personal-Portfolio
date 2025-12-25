// Simple typewriter cycling words
    (function(){
      const el = document.getElementById('typewriter');
      const words = ['designer','developer','software engineer','ui/ux enthusiast'];
      let idx=0; let char=0; let forward=true; let delay=120;
      function tick(){
        const word = words[idx];
        if(forward){
          char++;
          el.textContent = word.slice(0,char);
          if(char===word.length){ forward=false; setTimeout(tick,800); return; }
        } else {
          char--;
          el.textContent = word.slice(0,char);
          if(char===0){ forward=true; idx=(idx+1)%words.length; }
        }
        setTimeout(tick, delay);
      }
      tick();
    })();

    // Simple reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    const bars = document.querySelectorAll('.skill .bar > span');
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(ent=>{
        if(ent.isIntersecting){
          ent.target.classList.add('visible');
          // animate skill bars when they appear
          if(ent.target.matches('#skills') || ent.target.closest('#skills')){
            bars.forEach(b=>{ b.style.width = b.getAttribute('data-width') || '80%'; });
          }
        }
      });
    },{threshold:0.12});
    reveals.forEach(r=>io.observe(r));

    // Simple handlers (replace with real links)
    function openResume(){ window.open('#','_blank'); }
    function openPortfolio(){ window.open('#','_blank'); }
    function contact(){ window.open('mailto:maidah@example.com'); }

    // make sure skill bars animate if already in view
    window.addEventListener('load',()=>{
      document.querySelectorAll('.reveal').forEach(r=>{
        const rect = r.getBoundingClientRect();
        if(rect.top < (window.innerHeight || document.documentElement.clientHeight)) r.classList.add('visible');
      });
    });