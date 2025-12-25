document.addEventListener("DOMContentLoaded", () => {

  // ============================
  // Typewriter
  // ============================
  (function(){
    const el = document.getElementById('typewriter');
    if (!el) return;

    const words = ['designer','developer','software engineer','ui/ux enthusiast'];
    let idx=0, char=0, forward=true, delay=120;

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


  // ============================
  // Reveal Animation + Skill Bars
  // ============================
  const reveals = document.querySelectorAll('.reveal');
  const bars = document.querySelectorAll('.skill .bar > span');

  if (reveals.length > 0) {
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(ent=>{
        if(ent.isIntersecting){
          ent.target.classList.add('visible');

          // animate skills if inside skills section
          if(ent.target.matches('#skills') || ent.target.closest('#skills')){
            bars.forEach(b=>{ 
              b.style.width = b.getAttribute('data-width') || '80%'; 
            });
          }
        }
      });
    },{threshold:0.12});

    reveals.forEach(r=>io.observe(r));
  }


  // ============================
  // Resume / Portfolio Handlers
  // ============================
  window.openResume = () => window.open('#','_blank');
  window.openPortfolio = () => window.open('#','_blank');
  window.contact = () => window.open('mailto:maidah@example.com');


  // ============================
  // Portfolio Filter
  // ============================
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {

      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      projects.forEach(proj => {
        proj.style.display = (filter === "all" || proj.dataset.type === filter)
          ? "block"  
          : "none";
      });
    });
  });


  // ============================
  // Portfolio Popup
  // ============================
  const popup = document.getElementById("projectPopup");
  const popupTitle = document.getElementById("popupTitle");
  const popupDesc = document.getElementById("popupDesc");
  const popupLinks = document.getElementById("popupLinks");
  const closePopup = document.querySelector(".closePopup");

  if (popup && closePopup) {
    document.querySelectorAll(".viewDetail").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();

        popupTitle.textContent = link.dataset.title || '';
        popupDesc.textContent = link.dataset.desc || '';
        popupLinks.innerHTML = "";

        if (link.dataset.demo) {
          const demoBtn = document.createElement("a");
          demoBtn.href = link.dataset.demo;
          demoBtn.target = "_blank";
          demoBtn.textContent = "Live Demo";
          demoBtn.className = "popup-btn";
          popupLinks.appendChild(demoBtn);
        }
        if (link.dataset.github) {
          const gitBtn = document.createElement("a");
          gitBtn.href = link.dataset.github;
          gitBtn.target = "_blank";
          gitBtn.textContent = "GitHub Repo";
          gitBtn.className = "popup-btn";
          popupLinks.appendChild(gitBtn);
        }

        popup.style.right = "0";
      });
    });

    closePopup.addEventListener("click", () => {
      popup.style.right = "-400px";
    });
  }


  // ============================
  // Client Slider
  // ============================
  const clientsTrack = document.querySelector('.clients-track');
  const clients = document.querySelectorAll('.client-card');
  const dotsContainer = document.querySelector('.clients-dots');

  if (clientsTrack && clients.length > 0) {

    let currentClientIndex = 0;
    const totalClients = clients.length;

    // create dots
    for (let i = 0; i < totalClients; i++) {
      const dot = document.createElement('button');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentClientIndex = i;
        updateClientsSlider();
        resetClientsAutoplay();
      });
      dotsContainer.appendChild(dot);
    }

    function updateClientsSlider() {
      const cardWidth = clients[0].offsetWidth + 20;
      clientsTrack.style.transform = `translateX(${-currentClientIndex * cardWidth}px)`;

      document.querySelectorAll('.clients-dots button')
        .forEach((dot, i) => dot.classList.toggle('active', i === currentClientIndex));
    }

    let clientsAutoplay = setInterval(nextClient, 3000);

    function nextClient() {
      currentClientIndex = (currentClientIndex + 1) % totalClients;
      updateClientsSlider();
    }

    function resetClientsAutoplay() {
      clearInterval(clientsAutoplay);
      clientsAutoplay = setInterval(nextClient, 3000);
    }

    updateClientsSlider();
  }


  // ============================
  // Sidebar + Topnav
  // ============================
  const sidebarBtns = document.querySelectorAll('.tab-btn');
  const topBtns = document.querySelectorAll('.topnav a');
  const panels = document.querySelectorAll('.panel');

  function activateTab(name) {
    sidebarBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === name));
    topBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === name));
    panels.forEach(p => p.classList.toggle('active', p.id === name));
    if (name === 'resume') animateSkills();
  }

  sidebarBtns.forEach(b => b.addEventListener('click', () => activateTab(b.dataset.tab)));
  topBtns.forEach(b => b.addEventListener('click', e => {
    e.preventDefault();
    activateTab(b.dataset.tab);
  }));


  // ============================
  // Testimonials Slider
  // ============================
  const track = document.getElementById('testiTrack');
  const progress = document.getElementById('testiProgress');

  if (track && track.children.length > 0) {

    const testiCount = track.children.length;
    let testiIndex = 0;

    function showTesti(i) {
      const w = track.children[0].offsetWidth + 12;
      track.style.transform = `translateX(-${i * w}px)`;
      const pct = (i / testiCount) * 100;
      progress.style.transform = `translateX(${pct}%)`;
    }

    setInterval(() => { 
      testiIndex = (testiIndex + 1) % testiCount; 
      showTesti(testiIndex); 
    }, 3500);

    // Open modal on click
    document.querySelectorAll('.testimonial').forEach(t => {
      t.addEventListener("click", () => {
        const title = t.dataset.title;
        const text = t.dataset.text;
        openModal(`<h3>${title}</h3><p style="color:rgba(248,250,252,0.85)">${text}</p>`);
      });
    });

    showTesti(0);
  }


  // ============================
  // Modal
  // ============================
  const modal = document.getElementById('sideModal');
  const modalContent = document.getElementById('modalContent');
  const closeModalBtn = document.getElementById('closeModal');

  function openModal(html) {
    if (!modal || !modalContent) return;
    modalContent.innerHTML = html;
    modal.style.display = 'block';
  }

  function closeModal() {
    if (!modal) return;
    modal.style.display = 'none';
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  window.openModal = openModal;


  // ============================
  // Skills Animation
  // ============================
  function animateSkills() {
    document.querySelectorAll('.skill-fill').forEach(s => {
      const p = s.dataset.percent || 0;
      setTimeout(() => s.style.width = p + '%', 80);
    });
  }


  // ============================
  // Certificate Filtering
  // ============================
  const certBtns = document.querySelectorAll('#certificates .filter-btn');
  const certItems = document.querySelectorAll('#certificates .projects .project');

  certBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      certBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      certItems.forEach(item => {
        item.style.display = (filter === 'all' || item.dataset.type === filter)
          ? 'block'
          : 'none';
      });
    });
  });

});
