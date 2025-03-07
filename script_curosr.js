document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor-follower');
    const cursorGlow = document.querySelector('.cursor-glow');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let glowX = 0;
    let glowY = 0;
    
    // Create trail elements
    const trailCount = 5;
    const trailElements = [];
    
    for (let i = 0; i < trailCount; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.cssText = `
        position: fixed;
        width: ${12 - i * 2}px;
        height: ${12 - i * 2}px;
        border-radius: 50%;
        background-color: rgba(31, 233, 255, ${0.4 - i * 0.07});
        pointer-events: none;
        z-index: 9998;
        mix-blend-mode: screen;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease, opacity 0.5s ease;
        opacity: ${0.8 - i * 0.15};
      `;
      document.body.appendChild(trail);
      trailElements.push(trail);
    }
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Hide the default cursor
      document.body.style.cursor = 'none';
      
      // Show custom cursor
      cursor.style.opacity = '1';
      cursorGlow.style.opacity = '1';
      trailElements.forEach(trail => {
        trail.style.opacity = trail.style.opacity;
      });
      
      // Create sparkle effect occasionally
      if (Math.random() < 0.03) {
        createSparkle(mouseX, mouseY);
      }
    });
    
    // Hide custom cursor when mouse leaves the window
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      cursorGlow.style.opacity = '0';
      trailElements.forEach(trail => {
        trail.style.opacity = '0';
      });
      document.body.style.cursor = 'auto';
    });
    
    // Show default cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.backgroundColor = 'rgba(255, 0, 255, 0.5)';
        document.body.style.cursor = 'pointer';
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.backgroundColor = 'rgba(31, 233, 255, 0.5)';
        document.body.style.cursor = 'none';
      });
    });
    
    // Create sparkle effect
    function createSparkle(x, y) {
      const sparkle = document.createElement('div');
      sparkle.className = 'cursor-sparkle';
      
      // Random sparkle properties
      const size = Math.random() * 10 + 5;
      const duration = Math.random() * 1 + 0.5;
      const rotation = Math.random() * 360;
      const color = Math.random() > 0.5 ? '#1fe9ff' : '#ff00ff';
      
      sparkle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background-color: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9997;
        transform: translate(-50%, -50%) rotate(${rotation}deg);
        opacity: 0.8;
        filter: blur(1px);
        box-shadow: 0 0 8px ${color};
        animation: sparkle ${duration}s forwards;
      `;
      
      document.body.appendChild(sparkle);
      
      // Remove sparkle after animation
      setTimeout(() => {
        sparkle.remove();
      }, duration * 1000);
    }
    
    // Animation loop
    function animateCursor() {
      // Smooth cursor follow with easing
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      
      // Slower glow follow
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;
      
      // Update cursor positions
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
      
      // Update trail positions with delay
      trailElements.forEach((trail, index) => {
        setTimeout(() => {
          trail.style.left = `${cursorX}px`;
          trail.style.top = `${cursorY}px`;
        }, index * 40);
      });
      
      requestAnimationFrame(animateCursor);
    }
    
    // Add sparkle animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes sparkle {
        0% {
          transform: translate(-50%, -50%) rotate(0deg) scale(0);
          opacity: 0;
        }
        50% {
          opacity: 0.8;
        }
        100% {
          transform: translate(-50%, -50%) rotate(${Math.random() * 180}deg) scale(1.5);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Start animation
    animateCursor();
  });