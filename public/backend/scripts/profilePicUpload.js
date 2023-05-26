window.onload = function () {

    let baseCropping = $('#cropped-image').croppie({
        viewport: {
            width: 500,
            height: 500
        },
        boundary: {
            width: 600,
            height: 600
        },
        showZoomer: true

    })


    //get the file from the HTML file element
    function readableFile(file) {
        let reader = new FileReader();
        reader.onload = function (event) {
            baseCropping.croppie('bind', {
                url: event.target.result
            }).then(() => {
                $('.cr-slider').attr({
                    'min': 0.2000,
                    'max': 1.5000
                })
            })
        }
        reader.readAsDataURL(file)
    }

    $('#profilePicFile').on('change', function (e) {
        if (this.files[0]) {
            readableFile(this.files[0])
            $('#crop-modal').modal('show', {
                backdrop: 'static',
                keyboard: false
            });
            // $('#crop-modal').modal({
            //     show:true,
            // backdrop:'static',
            // keyboard:false
            // })
        }

    })

    //Cancel the modal
    $('#cancel-cropping').on('click', function () {
        $('#crop-modal').modal('hide')
    })


    $('#upload-image').on('click', async function () {
        try {

            baseCropping.croppie('result', 'blob').then(blob => {
                    //crete a form for upload image
                    let formData = new FormData()

                    //get the file from image filed
                    let file = document.getElementById('profilePicFile').files[0]

                    //Append the file data with from
                    formData.append('profilePic', blob, file.name)

                    //Create a header request
                    let headers = new Headers()

                    //Set the request type
                    headers.append('Accept', 'Application/JSON')

                    //Prepare the post request
                    let req = new Request('/uploads/profilePic', {
                        method: 'POST',
                        headers,
                        mode: 'cors',
                        body: formData
                    })
                    //send a fetch request which will return a promise
                    return fetch(req) //This fetch will return a promise
                })

                //dealing fetch promise
                .then(response => response.json())
                .then(data => {
                    // console.log(JSON.stringify(data));
                    console.log(data)
                    document.getElementById('removeProfilePic').style.display = 'block'
                    //If upload is successful then change the profile picture view user image
                    document.getElementById('profilePic').src = data.profilePic
                    document.getElementById('profilePicForm').reset()
                    $('#crop-modal').modal('hide');
                    setTimeout(() => {
                        baseCropping.croppie('destroy')
                    }, 1000)
                })
        } catch (e) {
            console.log(e);
        }
    })


    // To remove the profile pic
    $('#removeProfilePic').on('click', function () {
        let req = new Request('/uploads/profilePic', {
            method: 'DELETE',
            mode: 'cors'
        })
        
        fetch(req)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                document.getElementById('removeProfilePic').style.display = 'block'
                document.getElementById('profilePic').src = data.profilePic
                document.getElementById('profilePicForm').reset()
            })
            .catch(e => {
                console.log(e);
            })
    })
}

//Croppie will always return (.png) so we want to replace it with our original file type 
function generateFileName(name) {
    const types = /(.jpeg|.jpg|.png|.gif)/
    return name.replace(types, '.png')
}