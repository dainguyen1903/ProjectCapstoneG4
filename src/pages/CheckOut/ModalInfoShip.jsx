import { Button, Input, Modal } from 'antd';
import React, { useState } from 'react';

const ModalInfoShip= ({visible,onClose,shipData,setShipData}) => {
    const [data,setdata] = useState(shipData)
    
  return (
<div>

<Modal
      title="Thông tin người nhận"
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose={true}
    >
      <div>
        <label>Tên người nhận:</label>
        <Input
          value={data.receiverName}
          onChange={e => setdata({...data,receiverName:e.target.value})}
          placeholder="Nhập tên người nhận"
        />
      </div>
      <div style={{ marginTop: 16 }}>
        <label>Số điện thoại người nhận:</label>
        <Input
          value={data.receiverPhone}
          onChange={e => setdata({...data,receiverPhone:e.target.value})}
          placeholder="Nhập số điện thoại người nhận"
        />
      </div>
      <div style={{ marginTop: 16 }}>
        <label>Địa chỉ:</label>
        <Input
          value={data.receiverAddress}
          onChange={e => setdata({...data,receiverAddress:e.target.value})}
          placeholder="Nhập địa chỉ người nhận"
        />
      </div>
      <div style={{ marginTop: 16 }}>
        <label>Ghi chú:</label>
        <Input
          value={data.note}
          onChange={e => setdata({...data,note:e.target.value})}
          placeholder="Nhập ghi chú"
        />
      </div>
      <div style={{ marginTop: 24 }}>
        <Button onClick={() => {
            setShipData((data));
            onClose()
        }} type="primary" >
          Xác nhận
        </Button>
        <Button
          style={{ marginLeft: '8px' }}
          onClick={onClose}
        >
          Hủy
        </Button>
      </div>
    </Modal>
</div>
   )
}

export default ModalInfoShip