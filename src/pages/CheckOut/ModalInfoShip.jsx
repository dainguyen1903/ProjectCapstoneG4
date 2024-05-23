import { Button, Checkbox, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import Province from "../components/common/Province";

const ModalInfoShip = ({
  visible,
  onClose,
  shipData,
  setShipData,
  dataProvince : pro,
  setDataPro : setPro,
}) => {
  const [data, setdata] = useState(shipData);
  const [dataProvince,setDataPro] = useState(pro)
  console.log(dataProvince)

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
            onChange={(e) => setdata({ ...data, receiverName: e.target.value })}
            placeholder="Nhập tên người nhận"
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Số điện thoại người nhận:</label>
          <Input
            value={data.receiverPhone}
            onChange={(e) =>
              setdata({ ...data, receiverPhone: e.target.value })
            }
            placeholder="Nhập số điện thoại người nhận"
          />
        </div>
        <div>
          <Province
            width={"100%"}
            setStateData={setDataPro}
            state={dataProvince}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Địa chỉ thường trú:</label>
          <Input
            value={data.receiverAddress}
            onChange={(e) =>
              setdata({ ...data, receiverAddress: e.target.value })
            }
            placeholder="Nhập địa chỉ người nhận"
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Ghi chú:</label>
          <Input
            value={data.note}
            onChange={(e) => setdata({ ...data, note: e.target.value })}
            placeholder="Nhập ghi chú"
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <Checkbox
            checked={data.desiredDeliveryTime}
            onChange={(e) =>
              setdata({ ...data, desiredDeliveryTime: e.target.checked })
            }
          >
            Nhận hàng ngoài giờ hành chính <span style={{
              color:"gray",
              fontStyle:"italic"
            }}>{!data.desiredDeliveryTime ? " (Phí ship 15.000 VND)" :" ( Phí ship 25.000 VND)"}</span>
          </Checkbox>
        </div>
        <div style={{ marginTop: 24 }}>
          <Button
            onClick={() => {
              setShipData(data);
              setPro(dataProvince)
              onClose();
            }}
            type="primary"
          >
            Xác nhận
          </Button>
          <Button style={{ marginLeft: "8px" }} onClick={onClose}>
            Hủy
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalInfoShip;
