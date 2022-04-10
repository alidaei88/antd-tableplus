import React from 'react';
import './App.css';
import { v4 as uuid } from 'uuid';
import { useState } from 'react';
import { ConfigProvider, Space, Tag } from 'antd';
import { EditTwoTone, DeleteTwoTone, PlusCircleOutlined, WarningTwoTone } from '@ant-design/icons'
import Header from './Components/Header';
import AddButton from './Components/AddButton'
import MyTable from './Components/MyTable/MyTable';
import MyModal from './Components/MyModal/MyModal';



function App() {

  const [ isAddModalVisible, setIsAddModalVisible ] = useState(false);
  const [ addUserNameValue, setAddUserNameValue ] = useState("")
  const [ addTitleValue, setAddTitleValue ] = useState("")

  const [isDeleteModalVisible, setIsDeletModalVisible] = useState(false)

  
  const [ isEditModalVisible, setIsEditModalVisible ] = useState(false)
  
  const [ data, setData ] = useState([])

  const showAddModal = () => {
    setIsAddModalVisible(true)
  
  }

  const handleAddCancel = () => {
    setIsAddModalVisible(false)

  }


  

  const handleEditIconClick = () => {
    setIsEditModalVisible(true)
  }
  
  const handleEditOk = () => {
    setIsEditModalVisible(false)
  }

  const handleEditCancel = () => {
    setIsEditModalVisible(false)
  }

  const handleDeleteIconClick = (id) => {
    setIsDeletModalVisible(true)
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);

  }
  
  const handleDeleteOk = (id) => {
    setIsDeletModalVisible(false)

  }
  const columns = [
    {
      title: 'کد',
      dataIndex: 'id',
      key: 'id',
      render: text => <span>{text}</span>,
    },
    {
      title: 'نام',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'عنوان',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'عملیات',
      key: 'action',
      render: (record) => (  
        <Space size="middle">
          <DeleteTwoTone  onClick={() =>  handleDeleteIconClick(record.id)} />
          <EditTwoTone onClick={ handleEditIconClick } />
        </Space>
      ),
    },
  ];

  
  const handleAddOk = () => {
    const newData = {
      id: uuid(),
      name: addUserNameValue,
      title: addTitleValue, 
    }
    const updatedData = [...data, newData]
    setData(updatedData);
    setAddUserNameValue("");
    setAddTitleValue("")
    setIsAddModalVisible(false)

  }

  const handleDeleteCancel = () => {
    setIsDeletModalVisible(false)
  }
  
  return (

    <ConfigProvider direction='rtl'>
      <div className="App">
        <Header />
        <AddButton onClick={showAddModal}> جـدیـد <PlusCircleOutlined /> </AddButton>
        <MyModal className='add-modal' title={"افزودن سطر جدید"} isModalVisible={ isAddModalVisible } handleOk={ handleAddOk } handleCancel={ handleAddCancel } >
          <div className='add-modal'>
            <div className='edit-input'>
              <label htmlFor='edit-name'>کاربر </label>
              <input type='text' id='edit-name' value={ addUserNameValue } onChange={(e) => setAddUserNameValue(e.target.value)} />
            </div>
            <div className='header-input'>
              <label htmlFor='edit-header'>عنوان</label>
              <input type='text' id='edit-header' value={ addTitleValue } onChange={(e) => setAddTitleValue(e.target.value)} />
            </div>
          </div>
        </MyModal>
        <MyModal title={"حذف ردیف"} className='delete-modal' isModalVisible={isDeleteModalVisible} handleOk={ handleDeleteOk } handleCancel={ handleDeleteCancel } >
          <p>آیا مطمئن هستید؟</p>
        </MyModal>
        <MyModal title={"ویرایش"} className='edit-modal' isModalVisible={isEditModalVisible} handleOk={ handleEditOk } handleCancel={ handleEditCancel } >
          <p className='edit-modal-child'><WarningTwoTone className='edit-modal-child-icon'/><p>در حال ساخت...</p></p>
        </MyModal>
        <MyTable columns={ columns } data={ data } />
      </div>
    </ConfigProvider>

  );
}

export default App;
