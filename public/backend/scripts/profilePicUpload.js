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



  
}

function generateFileName(name) {
    const types = /(.jpeg|.jpg|.png|.gif)/
    return name.replace(types, '.png')
}