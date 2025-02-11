let currentSlide = 0;
let slides = document.querySelectorAll('.menu-slide');
let totalSlides = slides.length;
let startX = 0;
let endX = 0;

// 初始化显示第一张图片
showSlide(currentSlide);

function showSlide(index) {
    const offset = -index * 100;
    document.querySelector('.menu-container').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// 分类筛选功能
const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterSlides(button.dataset.category);
    });
});

function filterSlides(category) {
    slides = document.querySelectorAll('.menu-slide');
    slides.forEach(slide => {
        slide.style.display = (category === 'all' || slide.dataset.category === category) 
            ? 'flex' : 'none';
    });

    const visibleSlides = document.querySelectorAll('.menu-slide[style="display: flex;"]');
    totalSlides = visibleSlides.length;
    currentSlide = 0;
    showSlide(currentSlide);
}

// 触摸事件
const menuContainer = document.querySelector('.menu-container');

menuContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

menuContainer.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
});

menuContainer.addEventListener('touchend', () => {
    const threshold = 90;
    const deltaX = endX - startX;

    if (deltaX > threshold) {
        prevSlide();
    } else if (deltaX < -threshold) {
        nextSlide();
    }
});

// 鼠标拖动事件（桌面端支持）
let isMouseDown = false;
let mouseStartX = 0;
let mouseEndX = 0;

menuContainer.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    mouseStartX = e.clientX;
});

menuContainer.addEventListener('mousemove', (e) => {
    if (isMouseDown) mouseEndX = e.clientX;
});

menuContainer.addEventListener('mouseup', () => {
    if (!isMouseDown) return;
    isMouseDown = false;
    
    const threshold = 50;
    const deltaX = mouseEndX - mouseStartX;
    
    if (deltaX > threshold) {
        prevSlide();
    } else if (deltaX < -threshold) {
        nextSlide();
    }
});