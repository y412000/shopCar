import '../scss/main.scss';

console.log($)

$(function() {
    let y= 123;
    let x = `<div>
        <h1>${y}</h1>
    </div>`;
    $('body').on('click', (e)=> {
        console.log(this, e.target)
    })
})