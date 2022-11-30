import style from './CustomLoaderStyle.css'

const CustomLoader = () => {
    return (
        <div className="loader_area">
            <div className="loader"></div>
            <div className="loader_text">Please Wait...</div>
        </div>
    )
}

export default CustomLoader