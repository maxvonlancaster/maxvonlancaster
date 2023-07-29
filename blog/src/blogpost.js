let comments;
let page = window.location.pathname.split("/").pop();

$(document).ready(function () {
    fetch("https://api.npoint.io/f1370da3f3f283092f16")
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

    // You can access form data using the FormData object
    const name = formData.get("name");
    const message = formData.get("message");

    // var pathPage = window.location.pathname;
    // var page = pathPage.split("/").pop();
    // console.log(page);

    let data = {
        name: name,
        message: message,
        page: page,
        date: new Date().toLocaleString('en-GB')
    }

    // const gitrows = new Gitrows();

    // gitrows.options(options);

    // let path = '@github/maxvonlancaster/maxvonlancaster:main/blog/src/data.json';

    // gitrows.put(path, data)
    //     .then((resp) => {
    //         //handle (Array/Object)data
    //         console.log(resp);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //         //handle error, which has the format (Object){code:http_status_code,description='http_status_description'}
    //     });

    comments.push(data);

    const response = await fetch(`https://api.npoint.io/f1370da3f3f283092f16`, {
        method: "POST",
        headers: {
            // "Authorization": `token ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comments),
    });

    window.location.reload();
}

const formElement = document.getElementById("myForm");
formElement.addEventListener("submit", postData);