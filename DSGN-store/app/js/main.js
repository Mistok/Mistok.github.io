


var link = document.querySelectorAll('.arrow-link');
for(i=0; i < link.length; i++) {
    link[i].addEventListener('mouseenter', addArrow);
    link[i].addEventListener('mouseout', removeArrow);
}

function addArrow() {
    console.info('AddArr runs');
    event.target.classList.add('arrow-hover');

}
function removeArrow() {
    console.info('removeArrow runs');
    event.target.classList.remove('arrow-hover');
}