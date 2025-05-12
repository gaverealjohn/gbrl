$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() == 0) {
            $('#arrow-back-up').hide();
        } else {
            $('#arrow-back-up').show();
        }
    });
})

function toggleDarkMode() {
    let light = '#eeeeee';
    let dark = '#151515'
    let dmSecondaryDark = '#222222';
    let dmAccent = '#F2613F'
    let dmSecondary = '#FFA559';
    let dmSecondaryAccent = '#4e1212';
    let lmSecondaryDark = '#dddddd';
    let lmAccent = '#0d9ec0';
    let lmSecondary = '#005aa6';
    let lmSecondaryAccent = '#b1eded';

    if(document.getElementById('colormode-checkbox').checked) {
        document.querySelector(':root').style.setProperty('--light', dark);
        document.querySelector(':root').style.setProperty('--dark', light);
        document.querySelector(':root').style.setProperty('--secondary-dark', lmSecondaryDark);
        document.querySelector(':root').style.setProperty('--accent', lmAccent);
        document.querySelector(':root').style.setProperty('--secondary', lmSecondary);
        document.querySelector(':root').style.setProperty('--secondary-accent', lmSecondaryAccent);
    }
    else {
        document.querySelector(':root').style.setProperty('--light', light);
        document.querySelector(':root').style.setProperty('--dark', dark);
        document.querySelector(':root').style.setProperty('--secondary-dark', dmSecondaryDark);
        document.querySelector(':root').style.setProperty('--accent', dmAccent);
        document.querySelector(':root').style.setProperty('--secondary', dmSecondary);
        document.querySelector(':root').style.setProperty('--secondary-accent', dmSecondaryAccent);
    }
}

const selectWorkXP = (e) => {
    let workXPs = document.getElementsByClassName('work-experience');
    let workDetails = document.getElementsByClassName('work-detail');
    
    for (let workXP of workXPs) {
        workXP.classList.remove('active');
    }

    for (let workDetail of workDetails) {
        workDetail.classList.remove('active');
    }

    e.classList.add('active');
    let workId = e.getAttribute('data-work-id');
    document.getElementById(workId).classList.add('active');
}