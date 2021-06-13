import { useLocation } from "react-router"
import { useEffect, useState } from 'react'
import { app } from './firebase/firebase'

import axios from "axios";
const Update = () => {

    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');

    const [movie, setMovie] = useState(null)
    const [file, setfile] = useState(null);
    const [imageurl, setImageUrl] = useState(null);
    useEffect(() => {
        loadId(id);
    }, [])

    async function loadId(id) {

        await axios.get('http://localhost:5500/getOne?id=' + id)
            .then(res => setMovie(res))
            .catch(err => console.log(err))

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



    const updateData = (e) => {

        e.preventDefault();
        movie.thumbnailUrl = imageurl;
        movie.name = e.target[1].value;
        movie.language = e.target[2].value;
        movie.budget = e.target[3].value;
        movie.collections = e.target[4].value;

        setMovie(movie);


        axios.put('https://movie-backend-app2.herokuapp.com/update', movie)
            .then(res => {
                alert(res.data);
                window.location.reload()
            })




    }


    return (

        <div>
            {!movie ? <h1>data loading</h1> :


                <div class="movie-form-wrapper">

                    <div class="thumbnail-img-wrapper">
                        {
                            !imageurl ?
                                <img class="thumbnail-img" src={movie.data.thumbnailUrl} alt={movie.name}></img> :
                                <img class="thumbnail-img" src={imageurl} alt={movie.name}></img>

                        }
                    </div>
                    <form className="movie-form" onSubmit={updateData} >

                        <div class="form-grp">
                            <label>Thumbnail</label>
                            <input type="file" id="thumbnail" name="thumbnail" onChange={handleUpload}></input>
                        </div>

                        <div class="form-grp">
                            <label>Movie name</label>
                            <input value={movie.data.name} onChnage={() => { }} type="text" name="name"></input>
                        </div>


                        <div class="form-grp">
                            <label>languae</label>
                            <input value={movie.data.language} onChnage={() => { }} type="text" name="language"></input>
                        </div>



                        <div class="form-grp">
                            <label>budget</label>
                            <input value={movie.data.budget} onChange={() => { }} type="text" name="budget"></input>
                        </div>

                        <div class="form-group">
                            <label>Collections</label>
                            <input value={movie.data.collections} onChange={() => { }} type="text" name="collections"></input>
                        </div>




                        <button type="submit" id="submitButton" >submit</button>

                        <div class="errors">

                        </div>
                    </form>


                </div>

            }
        </div >
    )
}

export default Update