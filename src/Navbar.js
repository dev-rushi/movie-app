
import {

    Link
} from "react-router-dom";

const Navbar = () => {
    return (
        <div class="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/insert">Insert</Link></li>
                <li><Link to="/update">Update</Link></li>
            </ul>
        </div>
    )



}


export default Navbar