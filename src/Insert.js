import axios from 'axios'
import { app } from './firebase/firebase'
import { useState } from 'react';




const Insert = (props) => {


    const [file, setfile] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [movie, setMovie] = useState();
    const insertData = (e) => {


        e.preventDefault();
        const movie = {}
        movie.thumbnailUrl = imageUrl;
        movie.name = e.target[1].value;
        movie.language = e.target[2].value;
        movie.releaseDate = e.target[3].value;
        movie.budget = e.target[4].value;
        movie.collections = e.target[5].value;

        setMovie(movie)



        axios.post('http://localhost:5500/insert', movie)
            .then(res => {
                alert(res.data);
                window.location.reload()
            })


    }


    const handleUpload = (event) => {


        const image = event.target.files[0];
        const storageRef = app.storage().ref();
        const fileRef = storageRef.child(image.name);
        alert("asdfasdf");

        fileRef.put(image).then(() => {


            alert("file uplaoded")
            setfile(image.name);
            let url = `https://firebasestorage.googleapis.com/v0/b/movies-26af1.appspot.com/o/${image.name}?alt=media&token=8f153157-5c61-4745-b5ca-6c4fc91ddf15`
            setImageUrl(url)

            alert(file);
        });

    }



    return (

        <div class="movie-form-wrapper">


            <div class="thumbnail-img-wrapper">
                <h1>{file ? file : "No thubnail uploaded"}</h1>
                {imageUrl ? <img alt="no image" class="thumbnail-img" src={imageUrl} /> : ""}
            </div>
            <form className="movie-form" onSubmit={insertData}>


                <div class="form-grp">
                    <label>Thumbnail</label>
                    <input type="file" id="thumbnail" name="thumbnail" onChange={handleUpload}></input>
                </div>

                <div class="form-grp">
                    <label>Movie name</label>
                    <input type="text" name="name"></input>
                </div>


                <div class="form-grp">
                    <label>languae</label>
                    <input type="text" name="language"></input>
                </div>



                <div class="form-grp">
                    <label>Release Date:</label>
                    <input type="date" name="release-date"></input>
                </div>


                <div class="form-grp">
                    <label>budget</label>
                    <input type="text" name="budget"></input>
                </div>

                <div class="form-group">
                    <label>Collections</label>
                    <input type="text" name="collections"></input>
                </div>




                <button type="submit" id="submitButton" >submit</button>

                <div class="errors">

                </div>
            </form>


        </div>
    )
}


export default Insert