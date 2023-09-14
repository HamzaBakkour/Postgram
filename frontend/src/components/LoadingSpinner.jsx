import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner() {
    return (
    <div class = "d-flex m-5 justify-content-center align-items-center" style = {{height: "60vh"}} >
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="success" />
    </div>
    );
}

export default LoadingSpinner;