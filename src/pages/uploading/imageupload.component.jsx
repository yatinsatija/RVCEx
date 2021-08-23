import React from "react";
// import Axios from "axios";
import "./imageupload.styles.scss";
import { storage, firestore } from "../../firebase/firebase.utils";

class ImageUpload extends React.Component {
    constructor(props) {
      super(props);
      this.state = {file: '',imagePreviewUrl: '',uploads:[]};
    
    }
  

        


    _handleSubmit = async (event) => {
      
      const uploadTask = storage.ref(`userPhotoIds/${this.state.file.name}`).put(this.state.file);

            uploadTask.on('state_changed',
                (snapShot) => { alert("uploading in progress") },
                (error) => { alert(error.message) },
                () => {
                    storage
                        .ref('userPhotoIds')
                        .child(this.state.file.name)
                        .getDownloadURL()
                        .then((url) => {
                            alert("Image_uploaded");
                            localStorage.setItem("url",url)
                            console.log("image uploaded");
                            this.setState({ photoIdUrl: url }, () => console.log(this.state));
                        })
                });

      
    };
    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }
  
    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} />);
      } else {
        $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
      }
  
      return (
        <div className="previewComponent">
          <form >
            <input className="fileInput" 
              type="file" 
              onChange={(e)=>this._handleImageChange(e)} />
            <button className="submitButton" 
              type="button" 
              onClick={(e)=>this._handleSubmit(e)}
              >Upload Image</button>
          </form>
          <div className="imgPreview">
            {$imagePreview}
          </div>
        </div>
      )
    }
  }

export default ImageUpload;
    
