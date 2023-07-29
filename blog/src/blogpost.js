

function postData(event) {
    event.preventDefault(); // Prevent form submission
    const form = event.target;
    const formData = new FormData(form);

    // You can access form data using the FormData object
    const name = formData.get("name");
    const message = formData.get("message");

    var pathPage = window.location.pathname;
    var page = pathPage.split("/").pop();
    // console.log(page);

    let data = [{
        name: name,
        message: message,
        page: page,
        date: new Date().toLocaleString('en-GB')
    }]

    const gitrows = new Gitrows();

    // gitrows.options(options);

    let path = '@github/maxvonlancaster/maxvonlancaster:main/blog/src/data.json';

    gitrows.put(path, data)
        .then((resp) => {
            //handle (Array/Object)data
            console.log(resp);
        })
        .catch((error) => {
            console.log(error);
            //handle error, which has the format (Object){code:http_status_code,description='http_status_description'}
        });

}

const formElement = document.getElementById("myForm");
formElement.addEventListener("submit", postData);