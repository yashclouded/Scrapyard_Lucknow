document.querySelector('.register-button').addEventListener('mouseover', function() {
    this.style.transform = 'translateY(-5px) scale(1.05)';
    this.style.boxShadow = '0 0 30px rgba(31, 233, 255, 0.8)';
    this.querySelector('span').style.left = '0';
});

document.querySelector('.register-button').addEventListener('mouseout', function() {
    this.style.transform = '';
    this.style.boxShadow = '0 0 20px rgba(31, 233, 255, 0.6)';
    this.querySelector('span').style.left = '-100%';
});
