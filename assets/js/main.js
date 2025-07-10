/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click',()=>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click',()=>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // 点击每个菜单链接后收起菜单栏
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')

      function toggleSkills() {
        let itemClass = this.parentNode.className

        for(i = 0; i < skillsContent.length; i++) {
          skillsContent[i].className = 'skills__content skills__close'
        }
        if(itemClass === 'skills__content skills__close'){
          this.parentNode.className = 'skills__content skills__open'
        }
      }
      
      skillsHeader.forEach((el) => {
        el.addEventListener('click', toggleSkills)
      })

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    console.log('click disparado')
    const target = document.querySelector(tab.dataset.target)

    tabContents.forEach(tabContent => {
      tabContent.classList.remove('qualification__active')
    })
    target.classList.add('qualification__active')

    tabs.forEach(tab => {
      tab.classList.remove('qualification__active')
    })
    tab.classList.add('qualification__active')
  })
})


/*==================== PORTFOLIO SWIPER  ====================*/


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    sections.forEach(current =>{
        const sectionHeight = current.clientHeight
        const sectionTop = current.getBoundingClientRect().top;
        const sectionId = current.getAttribute('id')
        // section 位于视口中间时添加样式 active-link
        if(sectionTop <= window.innerHeight / 2 && sectionTop + sectionHeight >= window.innerHeight / 2){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
  }
  window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
  }
  window.addEventListener('scroll', scrollUp)

/*==================== DARK LIGHT THEME & LANGUAGE====================*/ 

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'
const language = 'cn'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    
    // Show theme change notification
    showThemeNotification();
    
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
    
    // Refresh scroll-driven animations for new theme
    setTimeout(() => {
      updateScrollDrivenAnimations();
    }, 100);
})

// Theme change notification function
function showThemeNotification() {
  const indicator = document.getElementById('theme-indicator');
  const isDarkMode = document.body.classList.contains(darkTheme);
  
  // Update notification content and styling
  if (isDarkMode) {
    indicator.textContent = '🌙 Dark Mode Activated';
    indicator.className = 'theme-indicator dark-mode';
  } else {
    indicator.textContent = '☀️ Light Mode Activated';
    indicator.className = 'theme-indicator light-mode';
  }
  
  // Show notification
  indicator.classList.add('show');
  
  // Hide notification after 2 seconds
  setTimeout(() => {
    indicator.classList.remove('show');
  }, 2000);
}

// ==================== MOUSE-DRIVEN FLOATING EFFECTS ====================
// Add subtle mouse-following effects for enhanced floating feel
let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) * 100;
  mouseY = (e.clientY / window.innerHeight) * 100;
  
  // Update CSS custom properties for mouse position
  document.body.style.setProperty('--mouse-x', `${mouseX}%`);
  document.body.style.setProperty('--mouse-y', `${mouseY}%`);
});

// ==================== SCROLL-DRIVEN ANIMATIONS ====================
// Animation system with longer white duration and faster blue transitions
function updateScrollDrivenAnimations() {
  const scrollTop = window.pageYOffset;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = Math.min(scrollTop / documentHeight, 1) * 100;
  
  // Update CSS custom property for background animation
  document.body.style.setProperty('--scroll-progress', `${scrollProgress}`);
  document.body.classList.add('scroll-driven');
  
  // Handle section animations based on scroll position
  const sections = document.querySelectorAll('.section');
  const viewportHeight = window.innerHeight;
  const viewportCenter = scrollTop + viewportHeight / 2;
  
  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionCenter = sectionTop + sectionHeight / 2;
    const sectionBottom = sectionTop + sectionHeight;
    
    // Enhanced animation progress with longer white duration
    let animationProgress = 0;
    let whiteIntensity = 0.92; // Base white level
    
    // Extended trigger zones for longer white duration
    const triggerStart = sectionTop - viewportHeight * 0.9;
    const peakStart = sectionTop - viewportHeight * 0.3;
    const peakEnd = sectionTop + sectionHeight * 0.7;
    const triggerEnd = sectionTop + sectionHeight * 0.3;
    
    if (scrollTop >= triggerStart && scrollTop < peakStart) {
      // Fade in phase
      animationProgress = (scrollTop - triggerStart) / (peakStart - triggerStart);
      animationProgress = Math.max(0, Math.min(1, animationProgress));
    } else if (scrollTop >= peakStart && scrollTop <= peakEnd) {
      // Extended peak white phase - stays at maximum brightness longer
      animationProgress = 1;
      whiteIntensity = 0.98; // Peak white intensity
    } else if (scrollTop > peakEnd && scrollTop <= triggerEnd) {
      // Fast fade out phase - quicker transition to blue
      const fadeProgress = (scrollTop - peakEnd) / (triggerEnd - peakEnd);
      animationProgress = 1 - (fadeProgress * fadeProgress * fadeProgress); // Cubic fade for faster drop-off
    } else if (scrollTop > triggerEnd) {
      animationProgress = 0;
    }
    
    // Apply smooth transforms based on scroll progress with subtle mouse influence
    const opacity = animationProgress;
    const translateY = (1 - animationProgress) * 60;
    const scale = 0.95 + (animationProgress * 0.05);
    
    // Add subtle mouse-based parallax effect
    const mouseInfluence = 0.5; // Subtle influence
    const mouseOffsetX = (mouseX - 50) * mouseInfluence * animationProgress;
    const mouseOffsetY = (mouseY - 50) * mouseInfluence * 0.3 * animationProgress;
    
    // Apply scroll-driven styles immediately with mouse influence
    section.style.opacity = opacity;
    section.style.transform = `translateY(${translateY + mouseOffsetY}px) translateX(${mouseOffsetX}px) scale(${scale})`;
    
    // Enhanced section highlighting with longer white duration
    const distanceFromCenter = Math.abs(viewportCenter - sectionCenter);
    const whitenessZone = sectionHeight * 0.8; // Larger zone for peak whiteness
    
    // Check if dark theme is active
    const isDarkMode = document.body.classList.contains('dark-theme');
    
    if (distanceFromCenter < whitenessZone) {
      const whitenessRatio = 1 - (distanceFromCenter / whitenessZone);
      const blurIntensity = 8 + (whitenessRatio * 6);
      
      if (isDarkMode) {
        // Beautiful dark mode section styling
        const darkOpacity = 0.85 + (whitenessRatio * 0.15); // 0.85 to 1.0
        section.style.background = `rgba(30, 30, 30, ${darkOpacity})`;
        section.style.backdropFilter = `blur(${blurIntensity}px)`;
        section.style.boxShadow = `0 8px 32px rgba(187, 134, 252, ${whitenessRatio * 0.1})`;
        section.style.border = `1px solid rgba(187, 134, 252, ${whitenessRatio * 0.2})`;
      } else {
        // Light mode section styling
        const backgroundOpacity = whiteIntensity + (whitenessRatio * 0.06);
        section.style.background = `rgba(255, 255, 255, ${backgroundOpacity})`;
        section.style.backdropFilter = `blur(${blurIntensity}px)`;
        section.style.boxShadow = 'none';
        section.style.border = 'none';
      }
    } else {
      if (isDarkMode) {
        // Dark mode default section styling
        section.style.background = 'rgba(25, 25, 25, 0.8)';
        section.style.backdropFilter = 'blur(6px)';
        section.style.boxShadow = 'none';
        section.style.border = '1px solid rgba(187, 134, 252, 0.05)';
      } else {
        // Light mode default section styling
        section.style.background = 'rgba(255, 255, 255, 0.88)';
        section.style.backdropFilter = 'blur(6px)';
        section.style.boxShadow = 'none';
        section.style.border = 'none';
      }
    }
  });
}

// High-frequency scroll listener for immediate response
let isScrolling = false;
window.addEventListener('scroll', () => {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      updateScrollDrivenAnimations();
      isScrolling = false;
    });
    isScrolling = true;
  }
});

// Initial call
updateScrollDrivenAnimations();

// ==================== SCROLL OFFSET FOR NAVIGATION ====================
// Position sections perfectly for peak white visibility when clicking nav links
const header = document.getElementById('header');
document.querySelectorAll('.nav__link[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const hash = this.getAttribute('href');
    if (hash.length > 1 && document.querySelector(hash)) {
      e.preventDefault();
      const target = document.querySelector(hash);
      const headerHeight = header ? header.offsetHeight : 0;
      const viewportHeight = window.innerHeight;
      const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
      
      // Position section at optimal white visibility (center of viewport)
      const optimalPosition = targetTop - (viewportHeight / 2) + (target.offsetHeight / 4);
      
      window.scrollTo({
        top: optimalPosition,
        behavior: 'smooth'
      });
      // Optionally update the URL hash
      history.replaceState(null, '', hash);
    }
  });
});