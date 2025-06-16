// spark_universe_showcase_7698/frontend/js/main.js
document.addEventListener("DOMContentLoaded", function () {
    // 粒子效果初始化
    if (typeof particlesJS !== "undefined") {
      particlesJS("particles-js", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#4a80f0" },
          shape: { type: "circle" },
          opacity: { value: 0.5, random: true },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#4a80f0",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out"
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" }
          }
        }
      });
    }
  
    // 导航点击事件
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  
    // 下箭头点击事件
    const scrollDownArrow = document.getElementById("scroll-down-arrow");
    if (scrollDownArrow) {
      scrollDownArrow.addEventListener("click", function () {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: "smooth" });
  
          // 添加点击反馈动画
          this.style.transform = "scale(0.8) rotate(45deg)";
          setTimeout(() => {
            this.style.transform = "scale(1) rotate(45deg)";
          }, 200);
        }
      });
    }
  
    // 移动端菜单处理
    const menuToggle = document.querySelector("nav button");
    const mobileMenu = document.querySelector("nav .hidden.md\\:flex");
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener("click", function () {
        if (mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.remove("hidden");
          mobileMenu.classList.add(
            "flex",
            "flex-col",
            "absolute",
            "top-full",
            "left-0",
            "right-0",
            "bg-gray-800",
            "p-4",
            "z-50"
          );
        } else {
          mobileMenu.classList.add("hidden");
          mobileMenu.classList.remove(
            "flex",
            "flex-col",
            "absolute",
            "top-full",
            "left-0",
            "right-0",
            "bg-gray-800",
            "p-4",
            "z-50"
          );
        }
      });
    }
  
    // 联盟档案馆分类展开/收起功能
    const categoryHeaders = document.querySelectorAll(".archive-category-header");
    categoryHeaders.forEach((header) => {
      header.addEventListener("click", function () {
        const category = this.parentElement;
        const content = this.nextElementSibling;
        const icon = this.querySelector(".archive-category-icon");
  
        // 切换分类展开状态
        category.classList.toggle("active");
  
        if (category.classList.contains("active")) {
          content.style.maxHeight = content.scrollHeight + "px";
          icon.style.transform = "rotate(180deg)";
        } else {
          content.style.maxHeight = "0";
          icon.style.transform = "rotate(0)";
        }
  
        // 添加点击反馈动画
        this.classList.add("pulse");
        setTimeout(() => {
          this.classList.remove("pulse");
        }, 300);
      });
    });
  
    // 档案项点击显示详情
    const archiveItems = document.querySelectorAll(".archive-item");
    const archiveDefault = document.getElementById("archive-default");
    const archiveContent = document.getElementById("archive-content");
    const archiveTitle = document.getElementById("archive-title");
    const archiveText = document.getElementById("archive-text");
    const archiveImage = document.getElementById("archive-image");
  
    archiveItems.forEach((item) => {
      item.addEventListener("click", function () {
        // 移除所有项的高亮
        archiveItems.forEach((i) =>
          i.classList.remove("bg-blue-900", "bg-opacity-30")
        );
  
        // 高亮当前项
        this.classList.add("bg-blue-900", "bg-opacity-30");
  
        // 显示详情内容
        archiveDefault.classList.add("hidden");
        archiveContent.classList.remove("hidden");
  
        // 填充内容
        const title = this.querySelector("h3").textContent;
        const text = this.querySelector("p").textContent;
  
        archiveTitle.textContent = title;
        archiveText.textContent = text;
  
        // 针对移动设备: 滚动到详情区域
        if (window.innerWidth < 768) {
          setTimeout(() => {
            const detailElement = document.getElementById("archive-detail");
            if (detailElement) {
              detailElement.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
        }
      });
    });
  
    // 轮播图功能
    const carouselTrack = document.querySelector(".carousel-track");
    const carouselSlides = document.querySelectorAll(".carousel-slide");
    const prevButton = document.querySelector(".carousel-prev");
    const nextButton = document.querySelector(".carousel-next");
  
    if (carouselTrack && carouselSlides.length > 0) {
      let currentIndex = 0;
      const slideWidth = 100; // 百分比
  
      // 更新轮播图位置
      const updateCarousel = () => {
        carouselTrack.style.transform = `translateX(-${
          currentIndex * slideWidth
        }%)`;
      };
  
      // 下一张
      const nextSlide = () => {
        currentIndex = (currentIndex + 1) % carouselSlides.length;
        updateCarousel();
      };
  
      // 上一张
      const prevSlide = () => {
        currentIndex =
          (currentIndex - 1 + carouselSlides.length) % carouselSlides.length;
        updateCarousel();
      };
  
      // 事件监听
      if (nextButton) nextButton.addEventListener("click", nextSlide);
      if (prevButton) prevButton.addEventListener("click", prevSlide);
  
      // 自动轮播
      let autoplayInterval = setInterval(nextSlide, 5000);
  
      // 鼠标悬停时暂停自动轮播
      const carouselContainer = document.querySelector(".carousel-container");
      if (carouselContainer) {
        carouselContainer.addEventListener("mouseenter", () => {
          clearInterval(autoplayInterval);
        });
  
        carouselContainer.addEventListener("mouseleave", () => {
          autoplayInterval = setInterval(nextSlide, 5000);
        });
      }
    }
  
    // 添加页面滚动效果
    window.addEventListener("scroll", function () {
      const sections = document.querySelectorAll(".section");
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
  
        if (sectionTop < windowHeight * 0.75) {
          section.classList.add("fade-in");
        }
      });
    });
  
    // 初始触发一次滚动事件，显示首屏内容
    window.dispatchEvent(new Event("scroll"));
  });
  