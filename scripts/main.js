function toggleDarkMode() {
    
    // document.getElementsByTagName('html')[0].style.filter = 'invert(1)';
    
    if(document.getElementById('color-toggle-icon').classList.contains('fa-sun-o')) {
        let lightBg = '#edecf0';
        let darkDot = '#12130f';
        let lightAccent = '#10d6e8';
        let darkFont = '#12130f';
        
        document.getElementById('color-toggle-icon').classList.remove('fa-sun-o');
        document.getElementById('color-toggle-icon').classList.add('fa-moon-o');

        document.querySelector('body').style.setProperty('--dot-bg', lightBg);
        document.querySelector('body').style.setProperty('--dot-color', darkDot);
        document.querySelector(':root').style.setProperty('--light', darkFont);
        document.querySelector(':root').style.setProperty('--accent', lightAccent);
    }
    else {
        document.getElementById('color-toggle-icon').classList.remove('fa-moon-o');
        document.getElementById('color-toggle-icon').classList.add('fa-sun-o');

        document.querySelector('body').style.setProperty('--dot-bg', 'var(--dark)');
        document.querySelector(':root').style.setProperty('--light', '#f4f3ee');
        document.querySelector('body').style.setProperty('--dot-color', 'var(--light)');
        document.querySelector(':root').style.setProperty('--accent', '#ef2917');
    }
}