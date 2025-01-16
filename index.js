document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar_'); 
    window.addEventListener('scroll', function() {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');

        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

const today = new Date();
const day = today.getDate();    
const month = today.getMonth() + 1; 
const year = today.getFullYear();
const todayFormat = year + "-" + (month < 10 ? '0' + month : month) + "-" + (day < 10 ? '0' + day : day);

$(".date").each(function() {
    var dateText = $(this).text(); 
    var dateParts = dateText.split("-");
    
    var date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    
    var diffInMs = today - date;
    var diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInDays < 30) {
        $(this).text(Math.floor(diffInDays) + " days ago");
    } else if (diffInDays < 365) {
        $(this).text(Math.floor(diffInDays / 30) + " months ago");
    } else if (diffInDays > 365) {
        $(this).text(Math.floor(diffInDays / 365) + " years ago");
    } else {
        $(this).text(dateText); 
    }
});