$(document).ready(function () {

    // alert("loaded")

    $.getJSON("/all", function (data) {
        displayResults(data)
        console.log('got data' + data);
    });
})
function displayResults(data) {
    // $("section").empty();
    data.forEach(item => {

        const anchor = $(`<div class = card-header><a href = ${item.link}>${item.summary}</a></div>`)
        $(".article").append(anchor)
        const body = $(`<div class = card-body>${item.title}</div>`)
        $(".article").append(body)

    })
}
