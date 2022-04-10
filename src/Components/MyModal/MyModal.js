import { Modal } from "antd";
import './MyModal.css';

const MyModal = (props) => {
    const { isModalVisible, handleOk, handleCancel, children, title } = props
    return (
        <Modal title={title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} closable={false}>
            {children}
        </Modal>
    )
}


export default MyModal