const unfold_elem = document.querySelectorAll('.unfold');
const sort_title = document.querySelectorAll('.unfold-title');
const content = document.querySelectorAll('.unfold-content');
let filter = false;

unfold_elem.forEach((elem) => {
    elem.addEventListener('click', () => {
        const open = elem.classList.contains('open')
        if (open) {
            if (filter) {
                filter = false
            }
            else {
                elem.classList.remove('open')
            }
        }
        else {
            elem.classList.add('open')
        }
    })
})

