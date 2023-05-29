tinymce.init({

  selector: 'textarea',

  plugins: [
    'lists link image table code help wordcount advlist lists link checklist autolink autosave code', 'preview', 'media table emoticons', 'image'
  ],
  toolbar: ' bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | forecolor backcolor emoticons | code preview',

  //if any pic drag on the field automatically upload on the server:true
  automatic_uploads: true,

  //Post image upload url when will drag on the filed
  images_upload_url: '/uploads/postimage', //when we will drag the file it will be uploaded but not work so have to handle the upload url 

  //handle the upload url handlers..We will get some arguments
  images_upload_handler: (blogInfo, success, failure) => {

    let headers = new Headers()
    headers.append('Accept', 'Application/json')

    let formData = new FormData()

    //prepare the header data, give a name and get the blob data from blobInfo
    formData.append('post-image', blogInfo.blob(), blogInfo.filename())

    //the url to upload already declared on above
    let req = new Request('/uploads/postimage', {
      method: 'POST',
      mode: 'cors',
      headers,
      body: formData
    })

    fetch(req)
      .then(res => res.json())
      .then(data => {
        console.log(data.imgUrl);
        //From data we will get a location which is save on the post body
        success(data.imgUrl)
      }).catch(err => {
        console.log(err);
        failure('HTTP error: ' + err.message)
      })

  }




});