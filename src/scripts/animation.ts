  
  // Counter Animation
  function animateCounter(element: HTMLElement) {
    const target = parseFloat(element.getAttribute('data-counter') || '0');
    const duration = parseInt(element.getAttribute('data-duration') || '2000');
    const suffix = element.getAttribute('data-suffix') || '';
    const prefix = element.getAttribute('data-prefix') || '';
    const decimals = (target.toString().split('.')[1] || '').length;
    
    element.textContent = prefix + '0' + suffix;
    
    const startTime = performance.now();
    
    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = target * easedProgress;
      
      element.textContent = prefix + currentValue.toFixed(decimals) + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = prefix + target.toFixed(decimals) + suffix;
      }
    };
    
    requestAnimationFrame(updateCounter);
  }

  /**
   * Initialize Counter Animation
   */
  function initCounters() {
    const counters = document.querySelectorAll('[data-animate]');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(entry.target as HTMLElement);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      
      counters.forEach((counter) => observer.observe(counter));
    } else {
      counters.forEach((counter) => animateCounter(counter as HTMLElement));
    }
  }

  /**
   * Smooth Scroll for anchor links
   */
  function initSmoothScroll() {
    // Remove existing listeners (prevent duplicates)
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      // Clone and replace to remove old listeners
      const newLink = link.cloneNode(true) as HTMLAnchorElement;
      link.parentNode?.replaceChild(newLink, link);
      
      newLink.addEventListener('click', function(e: Event) {
        const targetId = this.getAttribute('href');
        
        if (targetId && targetId !== '#' && targetId.length > 1) {
          e.preventDefault();
          const target = document.querySelector(targetId);
          
          if (target) {
            const headerOffset = 60;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
            
            // Update URL
            if (history.pushState) {
              history.pushState(null, '', targetId);
            }
          }
        }
      });
    });
  }

  /**
   * Progress Bar Animation
   * data-progress="80"
   * data-duration="1500"
   */
  function animateProgressBar(element: HTMLElement) {
    const target = parseFloat(element.getAttribute('data-progress') || '0');
    const duration = parseInt(element.getAttribute('data-duration') || '2000');

    const bar = element.querySelector('.progress-fill') as HTMLElement;
    if (!bar) return;

    bar.style.width = "0%";

    const startTime = performance.now();

    const updateBar = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easing seperti counter
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = target * easedProgress;

      bar.style.width = currentValue + "%";

      if (progress < 1) {
        requestAnimationFrame(updateBar);
      } else {
        bar.style.width = target + "%";
      }
    };

    requestAnimationFrame(updateBar);
  }

  /**
   * Initialize Progress Bars
   */
  function initProgressBars() {
    const bars = document.querySelectorAll('[data-progress]');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateProgressBar(entry.target as HTMLElement);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );

      bars.forEach(bar => observer.observe(bar));
    } else {
      bars.forEach(bar => animateProgressBar(bar as HTMLElement));
    }
  }

  /**
   * Initialize all scripts
   */
  function initAllScripts() {
    initCounters();
    initSmoothScroll();
    initProgressBars();
  }

  // Run on initial page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllScripts);
  } else {
    initAllScripts();
  }

  // Re-run after Astro view transitions
  document.addEventListener('astro:page-load', initAllScripts);