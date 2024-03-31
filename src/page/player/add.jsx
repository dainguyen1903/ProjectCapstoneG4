import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Modal,
  Card,
  Row,
  Col,
} from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import moment from "moment";
import { useNavigate, useParams } from "react-router";
import usePlayerStore from "../../zustand/playerStore";
import LoadingFull from "../../component/loading/loadingFull";
import { playerApi } from "../../api/player.api";
import AddImage from "../../component/common/AddImage";
import { POSITION_PLAYER } from "../../constants/common";
const { Option } = Select;

const AddPlayerForm = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [url, setUrl] = useState(null);
  const [imageName, setImageName] = useState("");
  const players = usePlayerStore((state) => state.players);
  const detail = players.find((i) => i.id == id) || {};
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();
  const navigate = useNavigate();
  // Confirm save
  const confirmSave = (value) => {
    const dataPosst = JSON.parse(JSON.stringify(value));
    const birdday = dataPosst.dateOfBirth;
    const joinday = dataPosst.joinDate;
    dataPosst.dateOfBirth = moment(birdday).format("YYYY-MM-DD");
    dataPosst.joinDate = moment(joinday).format("YYYY-MM-DD");
    // dataPosst.image_name = imageName;
    dataPosst.imageUrl = url;

    Modal.confirm({
      title: "Xác nhận",
      content: !id ? "Thêm cầu thủ" : "Cập nhật cầu thủ",
      onOk: async () => {
        const res = !id
          ? await playerApi.createrPlayer(dataPosst)
          : await playerApi.updatePalyer(id, dataPosst);
        if (res.data.status === 200 || res.data.status === 204) {
          Modal.success({
            title: "Thành công",
            content: !id ? "Thêm thành công" : "Cập nhật thành công",
          });
          navigate(-1);
        }
      },
    });
  };

  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
      setImageName(file.name);
      setUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // get dettail
  const getDetailPlayer = async () => {
    setLoading(true);
    const res = await playerApi.getDetailPlayer(id);
    const dataDetail = res.data.data;
    const imgName = detail.image_name;
    setImageName(imgName);
    dataDetail.joinDate = dataDetail.joinDate
      ? moment(dataDetail.joinDate)
      : null;
    dataDetail.dateOfBirth = dataDetail.dateOfBirth
      ? moment(dataDetail.dateOfBirth)
      : null;
    setUrl(dataDetail.imageUrl);
    dataDetail.imageUrl = imgName;
    delete dataDetail.image_name;
    console.log(dataDetail);
    form.setFieldsValue(dataDetail);
    setLoading(false);
  };
  useEffect(() => {
    if (id) {
      getDetailPlayer();
    }
  }, [id]);
  return (
    <Card>
      <div>
        <h2 style={{ marginBottom: 10 }}>
          {!id ? "Thêm cầu thủ" : "Cập nhật cầu thủ"}
        </h2>
        <Row>
          <Col span={12}>
            <Form
              form={form}
              wrapperCol={{ span: 24 }}
              onFinish={confirmSave}
              layout="vertical"
            >
              <div className="inputLabel">Tên cầu thủ</div>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên cầu thủ!" },
                ]}
              >
                <Input className="Input" placeholder="Tên cầu thủ" />
              </Form.Item>
              <div className="inputLabel">Ngày sinh</div>
              <Form.Item
                name="dateOfBirth"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập ngày sinh cầu thủ!",
                  },
                ]}
              >
                <DatePicker placeholder="Ngày sinh" className="Input" />
              </Form.Item>
              <div className="inputLabel">Chiều cao</div>
              <Form.Item
                name="height"
                rules={[
                  { required: true, message: "Vui lòng nhập chiều cao!" },
                ]}
              >
                <Input
                  placeholder="Chiều cao (cm)"
                  type="number"
                  className="Input"
                />
              </Form.Item>
              <div className="inputLabel">Cân nặng</div>
              <Form.Item
                name="weight"
                rules={[{ required: true, message: "Vui lòng nhập cân nặng!" }]}
              >
                <Input
                  placeholder="Cân nặng (kg)"
                  type="number"
                  className="Input"
                />
              </Form.Item>
              <div className="inputLabel">Quốc tịch</div>
              <Form.Item
                name="nationality"
                rules={[{ required: true, message: "Vui lòng nhập quốc tịch" }]}
              >
                <Input placeholder="Quốc tịch" type="text" className="Input" />
              </Form.Item>
              <div  style={{ marginBottom: 10 }} className="inputLabel">Vị trí</div>
              <Form.Item
                name="position"
                rules={[{ required: true, message: "Vui lòng nhập vị trí!" }]}
              >
                {/* <div style={{ marginBottom: 10, marginTop: 10 }}> */}
                  <Select placeholder="Vị trí" className="Select">
                    {POSITION_PLAYER.map((i) => (
                      <Option value={i}>{i}</Option>
                    ))}
                  </Select>
                {/* </div> */}
              </Form.Item>
              <div className="inputLabel">Tiểu sử</div>
              <Form.Item name="bio">
                <Input.TextArea placeholder="Tiểu sử" className="Input" />
              </Form.Item>
              <div className="inputLabel">Ngày gia nhập</div>
              <Form.Item
                name="joinDate"
                rules={[
                  { required: true, message: "Vui lòng nhập ngày gia nhập!" },
                ]}
              >
                <DatePicker placeholder="Ngày gia nhập" className="Input" />
              </Form.Item>
              <div className="inputLabel">Số áo</div>
              <Form.Item
                name="numberPlayer"
                rules={[{ required: true, message: "Vui lòng nhập số áo!" }]}
              >
                <Input placeholder="Số áo" type="text" className="Input" />
              </Form.Item>

              <Form.Item name="imageUrl">
                <input
                  style={{
                    display: "none",
                  }}
                  ref={fileRef}
                  onChange={handleChangeFile}
                  placeholder="Ảnh"
                  type="file"
                  className="Input"
                />
              </Form.Item>
              <Form.Item>
                <button
                  style={{ marginTop: -20 }}
                  className="Button"
                  htmlType="submit"
                  type="primary"
                >
                  {id ? "Cập nhật" : "Tạo mới"}
                </button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            <AddImage url={url} click={() => fileRef.current.click()} />
          </Col>
        </Row>
        <LoadingFull show={loading} />
      </div>
    </Card>
  );
};

export default AddPlayerForm;
