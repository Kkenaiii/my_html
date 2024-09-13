document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1 // 当目标元素可见10%时触发
    });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

//tours部分
const container = document.querySelector('.slider-container');    
const slides = document.querySelectorAll('.slide');    
const arrLeft = document.querySelector('.arrow-left');    
const arrRight = document.querySelector('.arrow-right');    
  
let currentIndex = 0;  
let slideInterval = null; // 用于存储定时器的引用  
  
// 设置自动切换的函数  
function autoPlaySlider() {  
    slideInterval = setInterval(() => {  
        if (currentIndex < slides.length - 1) {  
            currentIndex++;  
        } else {  
            currentIndex = 0; // 循环到第一张  
        }  
        moveSlider(currentIndex);  
    }, 2500); // 每2.5秒切换一次  
}  
  
// 初始化自动播放  
autoPlaySlider();  
  
// 当点击右箭头时  
arrRight.addEventListener('click', () => {    
    if (currentIndex < slides.length - 1) {    
        currentIndex++;    
    } else {    
        currentIndex = 0; // 循环到第一张    
    }    
    moveSlider(currentIndex);  
    // 清除自动播放的定时器，重新设置  
    clearInterval(slideInterval);  
    autoPlaySlider();  
});    
  
// 当点击左箭头时  
arrLeft.addEventListener('click', () => {    
    if (currentIndex > 0) {    
        currentIndex--;    
    } else {    
        currentIndex = slides.length - 1; // 循环到最后一张    
    }    
    moveSlider(currentIndex);  
    // 清除自动播放的定时器，重新设置  
    clearInterval(slideInterval);  
    autoPlaySlider();  
});    
  
function moveSlider(index) {    
    // 确保索引在有效范围内  
    if (index >= slides.length) {    
        index = 0;    
    } else if (index < 0) {    
        index = slides.length - 1;    
    }    
    
    const offset = -index * slides[0].offsetWidth;    
    container.style.transition = "transform 500ms ease-in-out";    
    container.style.transform = `translateX(${offset}px)`;    
}

/*文艺部分*/
// 定义变量 
    let chosenSlideNumber = 1; // 当前选择的幻灯片编号 
    let offset = 0; // 幻灯片偏移量 
    let barOffset = 0; // 导航条偏移量 
    let intervalID; // 定时器 ID 
    // 启动幻灯片轮播 
    startSlide();
    // 获取所有抽屉按钮，并为每个按钮添加点击事件监听器 
    const drawerBtns = Array.from(document.querySelectorAll(".drawer-btn"));
    drawerBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        clearInterval(intervalID); // 清除定时器 
        startSlide(); // 重新启动幻灯片轮播 
      })
    })
    // 获取幻灯片区域 
    const slideSection = document.querySelector("#slide-section");
    // 鼠标移入幻灯片区域时清除定时器 
    slideSection.addEventListener("mouseenter", () => {
      clearInterval(intervalID);
    })
    // 鼠标移出幻灯片区域时重新启动幻灯片轮播 
    slideSection.addEventListener("mouseleave", () => {
      startSlide();
    })
    // 切换到指定编号的幻灯片 
    function slideTo(slideNumber) {
      drawerboxToggle(slideNumber); // 切换抽屉面板状态 
      drawerbtnToggle(slideNumber); // 切换抽屉按钮状态 
      // 更新偏移量 
      let previousSlideNumber = chosenSlideNumber;
      chosenSlideNumber = slideNumber;
      offset += (chosenSlideNumber - previousSlideNumber) * (-100); // 计算幻灯片偏移量 
      barOffset += (chosenSlideNumber - previousSlideNumber) * (100); // 计算导航条偏移量 
      barSlide(barOffset); // 移动导航条 
      // 获取所有幻灯片，为每个幻灯片设置偏移量 
      const slides = document.querySelectorAll(".card");
      Array.from(slides).forEach(slide => {
        slide.style.transform = `translateY(${offset}%)`;
      })
    }
    // 切换抽屉面板状态 
    function drawerboxToggle(drawerboxNumber) {
      let prevDrawerboxNumber = chosenSlideNumber;
      const drawerboxes = document.querySelectorAll(".drawerbox");
      drawerboxes[prevDrawerboxNumber - 1].classList.toggle("active"); // 切换前一个抽屉面板的状态 
      drawerboxes[drawerboxNumber - 1].classList.toggle("active"); // 切换当前抽屉面板的状态 
    }
    // 切换抽屉按钮状态 
    function drawerbtnToggle(drawerBtnNumber) {
      let prevDrawerBtnNumber = chosenSlideNumber;
      const drawerBtns = document.querySelectorAll(".drawer-btn");
      drawerBtns[prevDrawerBtnNumber - 1].classList.toggle("active"); // 切换前一个抽屉按钮的状态 
      drawerBtns[drawerBtnNumber - 1].classList.toggle("active"); // 切换当前抽屉按钮的状态 
    }
    // 移动导航条 
    function barSlide(barOffset) {
      const bar = document.querySelector("#bar");
      bar.style.transform = `translateY(${barOffset}%)`;
    }
    // 启动幻灯片轮播 
    function startSlide() {
      intervalID = setInterval(() => {
        slideTo(chosenSlideNumber % 4 + 1); // 每次切换到下一个幻灯片 
      }, 2500); // 每隔 2.5 秒自动切换幻灯片 
    }
/*按钮*/
document.getElementById('getLocationBtn').addEventListener('click', function() {  
    getLocation();  
});  
  
function getLocation() {  
    if (navigator.geolocation) {  
        navigator.geolocation.getCurrentPosition(showPosition, showError);  
    } else {  
        alert("Geolocation is not supported by this browser.");  
    }  
}  
  
function showPosition(position) {  
    alert("您当前所处纬度: " + position.coords.latitude +   
          "\n您当前所处经度: " + position.coords.longitude);  
    // 这里可以调用 showPosition 函数来处理更多逻辑，例如更新页面元素等  
}  
  
function showError(error) {  
    switch(error.code) {  
        case error.PERMISSION_DENIED:  
            alert("User denied the request for Geolocation.");  
            break;  
        case error.POSITION_UNAVAILABLE:  
            alert("Location information is unavailable.");  
            break;  
        case error.TIMEOUT:  
            alert("The request to get user location timed out.");  
            break;  
        case error.UNKNOWN_ERROR:  
            alert("An unknown error occurred.");  
            break;  
    }  
}