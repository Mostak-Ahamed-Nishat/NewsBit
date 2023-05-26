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

    $('#cancel-cropping').on('click', function () {
        $('#crop-modal').modal('hide')
    })


    $('#upload-image').on('click', async function () {
        try {
            //upload the result what we get from baseCropping.And mention blob as we want to get the result as it(blob).
            //Then We will get a promise and will get the blob

            baseCropping.croppie('result', 'blob').then(blob => {
                    let formData = new FormData()
                    //get the file from input
                    let file = document.getElementById('profilePicFile').files[0]
                    // let name = generateFileName(file.name)
                    //FormData is a data what we will send to the server
                    formData.append('profilePic', blob, file.name)
                    // console.log(formData.getAll('profilePic'));

                    let headers = new Headers()
                    headers.append('Accept', 'Application/JSON')

                    let req = new Request('/uploads/profilePic', {
                        method: 'POST',
                        headers,
                        mode: 'cors',
                        body: formData
                    })
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

    $('#removeProfilePic').on('click', function () {
        let req = new Request('/uploads/profilePic', {
            method: 'DELETE',
            mode: 'cors'
        })

        fetch(req)
            .then(res => res.json())
            .then(data => {
                // document.getElementById('removeProfilePics').style.display = 'block'
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