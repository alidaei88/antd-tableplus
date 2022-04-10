import { Button } from "antd";
import './AddButton.css'

const AddButton = (props) => {
    const { children, onClick } = props
    return <Button className="add-button" onClick={ onClick } type="primary">{ children }</Button>
}


export default AddButton