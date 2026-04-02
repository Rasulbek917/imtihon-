let menuList = document.getElementById('menuList');

function toggleMenu() {
    if (menuList.style.display == 'flex') {
        menuList.style.display = 'none';
    } else {
        menuList.style.display = 'flex';
    }
}

const tabsbtnline = document.querySelectorAll('.knopkalar button');
const tabscontent = document.querySelectorAll('.content');

tabsbtnline.forEach((btn, index) => {
    btn.onclick = (e) => {
        tabsbtnline.forEach(b => {
            b.classList.remove('aktiv-knopka');
            b.classList.add('knopka');
        });
        e.target.classList.remove('knopka');
        e.target.classList.add('aktiv-knopka');

        tabscontent.forEach(content => {
            content.style.display = 'none';
        });
        tabscontent[index].style.display = 'flex';
    }
});






const counters = document.querySelectorAll('.ass99-sanay');
const container = document.querySelector('.sanaydigan-bolim');
let activated = false ;

window.addEventListener("scroll", () => {
    if(
        pageYOffset > container.offsetTop - container.offsetHeight - 200 && activated === false
    ){
        counters.forEach(counter => {
            const targetText = counter.dataset.count;
            const target = parseFloat(targetText); 
            const suffix = counter.dataset.text || ''; 
            const isFloat = targetText.includes('.'); 

            const prefix = counter.innerHTML.includes('&lt;') || counter.innerHTML.includes('<') ? '<' : '';

            counter.innerText = prefix + '0' + suffix;
            let count = 0;

            function updateCount() {
                if(count < target ){
                    count += target / 50;
                    
                    if(count >= target) count = target;

                    let displayCount = '';
                    if (isFloat) {
                        displayCount = count.toFixed(1); 
                    } else {
                        displayCount = Math.floor(count).toLocaleString(); 
                    }

                    counter.innerText = prefix + displayCount + suffix;
                    setTimeout(updateCount, 25);
                } else {
                    let displayCount = isFloat ? target.toFixed(1) : target.toLocaleString();
                    counter.innerText = prefix + displayCount + suffix;
                }
            }
            updateCount();
            activated = true;
        })
    } else if (pageYOffset < container.offsetTop - container.offsetHeight - 500 || pageYOffset === 0 && activated === true){
        counters.forEach(counter=>  {
            counter.innerText = counter.dataset.count;
            activated = false;
        })
    }
})

