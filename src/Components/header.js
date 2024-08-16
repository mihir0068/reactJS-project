import { Link } from 'react-router-dom';
import './Header.css';
const header=()=>{
    return <>
        <div className="header">
            <div>React Live Project</div>
            <div className='navigation'>
                <Link to="/Home">Home</Link>
                <Link to="/Users">Users</Link>
            </div>
        </div>
    </>
}
export default header;
