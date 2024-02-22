import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Button, DatePicker, Select, Modal } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import moment from 'moment';
import { useParams } from "react-router";
import usePlayerStore from "../../zustand/playerStore";
import LoadingFull from "../../component/loading/loadingFull";
const { Option } = Select;

const AddPlayerForm = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [url,setUrl] = useState(null)
  const [imageName,setImageName] = useState("")
  const updatePlayer = usePlayerStore((state) => state.updatePlayer);
  const addPlayer = usePlayerStore((state) => state.addPlayer);
  const players = usePlayerStore((state) => state.players);
  const detail = players.find(i => i.id == id) || {}
  const [loading,setLoading] = useState(false)
  const fileRef = useRef()
  // Confirm save
  const confirmSave = (value) => {

    const dataPosst = JSON.parse(JSON.stringify(value))
    const birdday  = dataPosst.date_of_birth 
    const joinday = dataPosst.join_date
   dataPosst.date_of_birth =  moment(birdday).format('YYYY-MM-DD');
   dataPosst.join_date =  moment(joinday).format('YYYY-MM-DD');
   dataPosst.image_name = imageName;
   dataPosst.image_url = url;

    Modal.confirm({
      title: "Xác nhận",
      content: !id ? "Thêm cầu thủ" : "Cập nhật cầu thủ",
      onOk: () => {
        setTimeout(() => {
          if (id) {
            updatePlayer(id,dataPosst);
          } else {
            addPlayer(dataPosst);
          }
          Modal.success({
            title: "Thành công",
            content: !id ? "Thêm thành công" : "Cập nhật thành công",
          });
          if (!id) {
            form.resetFields();
          }
        }, 1000);
      },
    });

  };

  const handleChangeFile = (e) => {
      let file = e.target.files[0];
      const tempUrl = URL.createObjectURL(file);
      setImageName(file.name)
      setUrl(tempUrl)
  }
  useEffect(() => {
    if (id) {
      setLoading(true);
      new Promise((resolve) => {
        const dataDetail = JSON.parse(JSON.stringify(detail))
        const imgName = detail.image_name
       setImageName(imgName)
        dataDetail.join_date = moment(dataDetail.join_date)
        dataDetail.date_of_birth = moment(dataDetail.date_of_birth)
        setUrl(dataDetail.image_url);
        dataDetail.image_url = imgName;
        delete dataDetail.image_name;
        setTimeout(() => {
          form.setFieldsValue(dataDetail);
          resolve();
        }, 1000);
      }).then(() => {
        setLoading(false);
      });
    }
  }, [id]);
  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>
        {!id ? "Thêm cầu thủ" : "Cập nhật cầu thủ"}
      </h2>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
        onFinish={confirmSave}
        layout="vertical"
      >
        <Form.Item
         
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên cầu thủ!" },
          ]}
        >
          <Input className="Input"  placeholder="Tên cầu thủ" />
        </Form.Item>
        <Form.Item
          
          name="date_of_birth"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập ngày sinh cầu thủ!",
            },
          ]}
        >
          <DatePicker placeholder="Ngày sinh" className="Input" />
        </Form.Item>
        <Form.Item
        
          name="height"
          rules={[
            { required: true, message: "Vui lòng nhập chiều cao!" },
          ]}
        >
          <Input   placeholder="Chiều cao (cm)" type="number" className="Input" />
        </Form.Item>
        <Form.Item
        
          name="weight"
          rules={[
            { required: true, message: "Vui lòng nhập cân nặng!" },
          ]}
        >
          <Input placeholder="Cân nặng (kg)" type="number" className="Input" />
        </Form.Item>
        <Form.Item
          
          name="nationality"
          rules={[
            { required: true, message: "Vui lòng nhập quốc tịch" },
          ]}
        >
          <Input placeholder="Quốc tịch" className="Input" />
        </Form.Item>
        <Form.Item
          
          name="position"
          rules={[
            { required: true, message: "Vui lòng nhập vị trí!" },
          ]}
        >
          <Input placeholder="Vị trí" className="Input" />
        </Form.Item>
        <Form.Item  name="bio">
          <Input.TextArea placeholder="Tiểu sử" className="Input"/>
        </Form.Item>
        <Form.Item
         
          name="join_date"
          rules={[
            { required: true, message: "Vui lòng nhập ngày gia nhập!" },
          ]}
        >
          <DatePicker  placeholder="Ngày gia nhập" className="Input" />
        </Form.Item>

        <Form.Item  name="image_url">
          <Button onClick={() => fileRef.current.click()} style={{
            marginBottom:10,
            marginRight:10
          }}>Thêm Ảnh</Button>   {imageName && <span>{imageName}</span>}
          <div className="flex-start" style={{
            alignItems:"center"
          }}>
        
          </div>
          <input style={{
            display:"none"
          }}  ref={fileRef} onChange={handleChangeFile} placeholder="Ảnh" type="file" className="Input" />
        
        </Form.Item>
        <Form.Item>
          <button className="Button" htmlType="submit" type="primary">
            {id ? "Cập nhật" : "Tạo mới"}
          </button>
        </Form.Item>
      </Form>
      <LoadingFull show={loading} />
    </div>
  );
};

export default AddPlayerForm;
