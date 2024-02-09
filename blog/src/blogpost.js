let comments;
let page = window.location.pathname.split("/").pop();

$(document).ready(function () {
    fetch("https://student-site.vercel.app/api/posts", {
        method: "GET",
})
        .then(response => response.json())
        .then(data => {
            comments = data;
            // comments = JSON.stringify(data);
            postComments();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    function getComment(name, message, date) {
        return '<div id="section-comment"> <h4>' + name + '</h4> <p>' + message + '</p> <p style="text-align:right">' + date + '</p>  </div>'
    }

    function postComments() {
        i = 1;
        comments.filter(c => c.page == page).sort((a, b) => a.date > b.date ? 1 : -1).forEach(c => {
            let str = getComment(c.name, c.message, c.date);
            $('#comments').append("<div id='comment-" + i + "'>" + str + "</div>");
            i++;
        })
    }
});

async function postData(event) {
    event.preventDefault(); // Prevent form submission
    const form = event.target;
    const formData = new FormData(form);

    const name = formData.get("name");
    const message = formData.get("message");


    let data = {
        name: name,
        message: message,
        page: page,
        date: new Date().toLocaleString('en-GB')
    }

    comments.push(data);

    const response = await fetch(`https://student-site.vercel.app/api/posts`, {
        method: "POST",
        body: JSON.stringify(data),
    });

    window.location.reload();
}

const formElement = document.getElementById("myForm");
formElement.addEventListener("submit", postData);