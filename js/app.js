document.addEventListener('DOMContentLoaded', () => {
    // 1. Narxlar tugmasini (oylik/yillik) boshqarish
    const knopka = document.getElementById('narx-knopka');
    const proNarx = document.getElementById('pro-narx');
    const proMatn = document.getElementById('pro-matn');
    const scaleNarx = document.getElementById('scale-narx');
    const scaleMatn = document.getElementById('scale-matn');
    
    let isAnnual = false;

    if (knopka) {
        knopka.addEventListener('click', () => {
            isAnnual = !isAnnual;
            if(isAnnual) {
                knopka.classList.add('yillik');
                proNarx.textContent = '$17.50';
                proMatn.innerHTML = 'per month <span class="oq-yozuv">($210 per year)</span>';
                scaleNarx.textContent = '$84';
                scaleMatn.innerHTML = 'per month <span class="oq-yozuv">($1,008 per year)</span>';
            } else {
                knopka.classList.remove('yillik');
                proNarx.textContent = '$24';
                proMatn.innerHTML = 'per month <span class="oq-yozuv">(billed monthly)</span>';
                scaleNarx.textContent = '$99';
                scaleMatn.innerHTML = 'per month <span class="oq-yozuv">(billed monthly)</span>';
            }
        });
    }

    const statistikaQismi = document.getElementById('statistika-qismi');
    const sonlar = document.querySelectorAll('.son');
    let isStarted = false;

    const observer = new IntersectionObserver((entries) => {

        if (entries[0].isIntersecting && !isStarted) {
            isStarted = true;
            
            sonlar.forEach((son) => {
                const max = parseFloat(son.getAttribute('data-maks'));
                const isFloat = son.hasAttribute('data-kasr');
                let current = 0;
                
                // Xar bir interval 30ms da bo'lsa, qadam shunga moslanadi
                const increment = max / 40; 
                
                const updateTimer = setInterval(() => {
                    current += increment;
                    if (current >= max) {
                        current = max;
                        clearInterval(updateTimer);
                    }
                    
                    if (isFloat) {
                        son.textContent = current.toFixed(1);
                    } else {
                        // "2400" kabi katta raqamlarni "2,400" qilib vergul bn formatlash
                        son.textContent = Math.floor(current).toLocaleString('en-US');
                    }
                }, 30);
            });
        }
    }, { threshold: 0.3 }); // Oyna element bilan kamida 30% to'qnashganda

    if (statistikaQismi) {
        observer.observe(statistikaQismi);
    }

    // 3. Tablarni (Dashboard, Funnels, SDK...) almashtirish
    const tabTugmalar = document.querySelectorAll('.tab-tugma');
    const tabContentlar = document.querySelectorAll('.tab-content');

    tabTugmalar.forEach(tugma => {
        tugma.addEventListener('click', () => {
            tabTugmalar.forEach(t => t.classList.remove('aktiv'));
            tabContentlar.forEach(c => c.classList.remove('aktiv-tab'));
            
            tugma.classList.add('aktiv');
            const tabId = tugma.getAttribute('data-tab');
            const targetTab = document.getElementById(tabId);
            if (targetTab) {
                targetTab.classList.add('aktiv-tab');
            }
        });
    });
});