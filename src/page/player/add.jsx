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
import {
  ERROR_KEY,
  handleError,
  objectCheckErrorInput,
  showMessErr400,
} from "../../ultis/helper";
const { Option } = Select;

const AddPlayerForm = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [url, setUrl] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imageFirstJersey, setImageFirstJerseyset] = useState();
  const [imageSecondJersey, setIimageSecondJersey] = useState();
  const players = usePlayerStore((state) => state.players);
  const detail = players.find((i) => i.id == id) || {};
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();
  const imageFirstRef = useRef();
  const imageSecondRef = useRef();

  const navigate = useNavigate();
  // Confirm save
  const confirmSave = (value) => {
    if (isErr) {
      return;
    }
    if (!validate()) {
      return;
    }
    const dataPosst = JSON.parse(JSON.stringify(data));
    const birdday = dataPosst.dateOfBirth;
    const joinday = dataPosst.joinDate;
    dataPosst.dateOfBirth = moment(birdday).format("YYYY-MM-DD");
    dataPosst.joinDate = moment(joinday).format("YYYY-MM-DD");
    // dataPosst.image_name = imageName;
    dataPosst.imageAvatar = url;
    dataPosst.imageFirstJersey = imageFirstJersey;
    dataPosst.imageSecondJersey = imageSecondJersey;

    Modal.confirm({
      title: "Xác nhận",
      content: !id ? "Thêm cầu thủ" : "Cập nhật cầu thủ",
      onOk: async () => {
        try {
          const res = !id
            ? await playerApi.createrPlayer(dataPosst)
            : await playerApi.updatePalyer(id, dataPosst);
          if (res.data.status === 200 || res.data.status === 204) {
            Modal.success({
              title: "Thành công",
              content: !id ? "Thêm thành công" : "Cập nhật thành công",
            });
            navigate(-1);
          } else {
            showMessErr400(res);
          }
        } catch (error) {
          console.log(error);
          handleError(error);
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
  const handleChangeFileImageFirst = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
      setImageFirstJerseyset(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleChangeFileImageSecond = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
      setIimageSecondJersey(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // get dettail
  const getDetailPlayer = async () => {
    setLoading(true);
    const res = await playerApi.getDetailPlayer(id);
    const dataDetail = res.data.data;
    const imgName = detail.image_name;
    setImageFirstJerseyset(dataDetail.imageFirstJersey);
    setIimageSecondJersey(dataDetail.imageSecondJersey);
    setImageName(imgName);
    dataDetail.joinDate = dataDetail.joinDate
      ? moment(dataDetail.joinDate)
      : null;
    dataDetail.dateOfBirth = dataDetail.dateOfBirth
      ? moment(dataDetail.dateOfBirth)
      : null;
    setUrl(dataDetail.imageAvatar);
    dataDetail.imageAvatar = imgName;
    delete dataDetail.image_name;
    console.log(dataDetail);
    setData(dataDetail);
    setLoading(false);
  };
  useEffect(() => {
    if (id) {
      getDetailPlayer();
    }
  }, [id]);

  const [data, setData] = useState({
    name: "",
    dateOfBirth: null,
    height: "",
    weight: "",
    nationality: "",
    position: "",
    bio: "",
    joinDate: null,
    playerNumber: "",
    imageAvatar: null,
    imageFirstJersey: null,
    imageSecondJersey: null,
  });
  const [err, setErr] = useState({
    name: "",
    dateOfBirth: null,
    height: "",
    weight: "",
    nationality: "",
    position: "",
    bio: "",
    joinDate: null,
    playerNumber: "",
    imageAvatar: null,
    imageFirstJersey: null,
    imageSecondJersey: null,
  });
  const handleSetErr = (field, value) => {
    setErr((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const handleChange = (field, value, listRule, prefix = "") => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    const listErr = [];
    listRule.forEach((rule) => {
      const txtErr = objectCheckErrorInput[rule](value, prefix);
      if (txtErr) {
        listErr.push(txtErr);
      }
    });
    if (listErr.length === 0) {
      handleSetErr(field, "");
    } else {
      handleSetErr(field, listErr[0]);
    }
  };
  const validate = () => {
    let newErr = { ...err };
    let isFlagErr = false;
    if (!data.name) {
      isFlagErr = true;
      newErr = { ...newErr, name: "Tên cầu thủ không được để trống" };
    } else {
      newErr = { ...newErr, name: "" };
    }
    if (!data.dateOfBirth) {
      isFlagErr = true;
      newErr = { ...newErr, dateOfBirth: "Ngày sinh không được để trống" };
    } else {
      newErr = { ...newErr, dateOfBirth: "" };
    }
    if (!data.height) {
      isFlagErr = true;
      newErr = { ...newErr, height: "Chiều cao không được để trống" };
    } else {
      newErr = { ...newErr, height: "" };
    }
    if (!data.weight) {
      isFlagErr = true;
      newErr = { ...newErr, weight: "Cân nặng không được dể trống" };
    } else {
      newErr = { ...newErr, weight: "" };
    }
    if (!data.nationality) {
      isFlagErr = true;
      newErr = {
        ...newErr,
        nationality: "Quốc tịch không được để trống",
      };
    } else {
      newErr = { ...newErr, nationality: "" };
    }
    if (!data.position) {
      isFlagErr = true;
      newErr = {
        ...newErr,
        position: "Vị trí không được để trống",
      };
    } else {
      newErr = { ...newErr, position: "" };
    }
    if (!data.joinDate) {
      isFlagErr = true;
      newErr = {
        ...newErr,
        joinDate: "Ngày gia nhập không được để trống",
      };
    } else {
      newErr = { ...newErr, joinDate: "" };
    }
    if (!data.playerNumber) {
      isFlagErr = true;
      newErr = {
        ...newErr,
        playerNumber: "Số áo không được để trống",
      };
    } else {
      newErr = { ...newErr, playerNumber: "" };
    }
    if (!url) {
      isFlagErr = true;
      newErr = {
        ...newErr,
        imageAvatar: "Ảnh cầu thủ không được để trống",
      };
    } else {
      newErr = { ...newErr, imageAvatar: "" };
    }
    if (!imageFirstJersey) {
      isFlagErr = true;
      newErr = {
        ...newErr,
        imageFirstJersey: "Ảnh áo sân nhà không được để trống",
      };
    } else {
      newErr = { ...newErr, imageFirstJersey: "" };
    }
    if (!imageSecondJersey) {
      isFlagErr = true;
      newErr = {
        ...newErr,
        imageSecondJersey: "Ảnh áo sân khách không được để trống",
      };
    } else {
      newErr = { ...newErr, imageSecondJersey: "" };
    }
    setErr(newErr);
    return !isFlagErr;
  };
  const isErr = Object.values(err).filter((i) => i)?.length > 0;

  useEffect(() => {
    if (url) {
      setErr({ ...err, imageAvatar: "" });
    }
  }, [url]);

  useEffect(() => {
    if (imageFirstJersey) {
      setErr({ ...err, imageFirstJersey: "" });
    }
  }, [imageFirstJersey]);

  useEffect(() => {
    if (imageSecondJersey) {
      setErr({ ...err, imageSecondJersey: "" });
    }
  }, [imageSecondJersey]);
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
              <Form.Item name="name">
                <Input
                  value={data.name}
                  onChange={(e) =>
                    handleChange(
                      "name",
                      e.target.value,
                      [ERROR_KEY.BLANK],
                      "Tên cầu thủ"
                    )
                  }
                  className="Input"
                  placeholder="Tên cầu thủ"
                />
                <div className="txt-err">{err?.name}</div>
              </Form.Item>
              <div className="inputLabel">Ngày sinh</div>
              <Form.Item name="dateOfBirth">
                <DatePicker
                  value={data.dateOfBirth}
                  inputReadOnly
                  placeholder="Ngày sinh"
                  className="Input"
                  onChange={(date) => {
                    setData({ ...data, dateOfBirth: date });
                    if (new Date(date) - new Date() >= 0) {
                      setErr({
                        ...err,
                        dateOfBirth: "Ngày sinh phải là ngày trong quá khứ",
                      });
                    } else {
                      setErr({
                        ...err,
                        dateOfBirth: "",
                      });
                    }
                  }}
                />
                <div className="txt-err">{err?.dateOfBirth}</div>
              </Form.Item>
              <div className="inputLabel">Chiều cao</div>
              <Form.Item name="height">
                <Input
                  value={data.height}
                  placeholder="Chiều cao (cm)"
                  type="number"
                  className="Input"
                  onChange={(e) =>
                    handleChange(
                      "height",
                      e.target.value,
                      [
                        ERROR_KEY.BLANK,
                        ERROR_KEY.NUMER,
                        ERROR_KEY.NUMBER_UNSIGN,
                      ],
                      "Chiều cao"
                    )
                  }
                />
                <div className="txt-err">{err?.height}</div>
              </Form.Item>
              <div className="inputLabel">Cân nặng</div>
              <Form.Item name="weight">
                <Input
                  placeholder="Cân nặng (kg)"
                  type="number"
                  className="Input"
                  value={data.weight}
                  onChange={(e) =>
                    handleChange(
                      "weight",
                      e.target.value,
                      [
                        ERROR_KEY.BLANK,
                        ERROR_KEY.NUMER,
                        ERROR_KEY.NUMBER_UNSIGN,
                      ],
                      "Cân nặng"
                    )
                  }
                />
                <div className="txt-err">{err?.weight}</div>
              </Form.Item>
              <div className="inputLabel">Quốc tịch</div>
              <Form.Item name="nationality">
                <Input
                  value={data.nationality}
                  onChange={(e) =>
                    handleChange(
                      "nationality",
                      e.target.value,
                      [ERROR_KEY.BLANK],
                      "Quốc tịch"
                    )
                  }
                  placeholder="Quốc tịch"
                  type="text"
                  className="Input"
                />
                <div className="txt-err">{err?.nationality}</div>
              </Form.Item>
              <div style={{ marginBottom: 10 }} className="inputLabel">
                Vị trí
              </div>
              <Form.Item name="position">
                {/* <div style={{ marginBottom: 10, marginTop: 10 }}> */}
                <Select
                  onChange={(v) => {
                    setData({ ...data, position: v });
                    setErr({ ...err, position: "" });
                  }}
                  value={data.position}
                  placeholder="Vị trí"
                  className="Select"
                >
                  {POSITION_PLAYER.map((i) => (
                    <Option value={i}>{i}</Option>
                  ))}
                </Select>
                <div className="txt-err">{err?.position}</div>

                {/* </div> */}
              </Form.Item>
              <div className="inputLabel">Tiểu sử</div>
              <Form.Item >
                <Input.TextArea
                  value={data.bio}
                  onChange={(e) => setData({ ...data, bio: e.target.value })}
                  placeholder="Tiểu sử"
                  className="Input"
                />
              </Form.Item>
              <div className="inputLabel">Ngày gia nhập</div>
              <Form.Item name="joinDate">
                <DatePicker
                  inputReadOnly
                  placeholder="Ngày gia nhập"
                  className="Input"
                  value={data.joinDate}
                  onChange={(date) => {
                    setData({ ...data, joinDate: date });

                    setErr({
                      ...err,
                      joinDate: "",
                    });
                  }}
                />
                <div className="txt-err">{err?.joinDate}</div>
              </Form.Item>
              <div className="inputLabel">Số áo</div>
              <Form.Item name="playerNumber">
                <Input
                  value={data.playerNumber}
                  onChange={(e) =>
                    handleChange(
                      "playerNumber",
                      e.target.value,
                      [
                        ERROR_KEY.BLANK,
                        ERROR_KEY.NUMER,
                        ERROR_KEY.NUMBER_UNSIGN,
                      ],
                      "Số áo"
                    )
                  }
                  placeholder="Số áo"
                  type="text"
                  className="Input"
                />
                <div className="txt-err">{err?.playerNumber}</div>
              </Form.Item>

              <Form.Item name="imageAvatar">
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
                <input
                  style={{
                    display: "none",
                  }}
                  ref={imageFirstRef}
                  onChange={handleChangeFileImageFirst}
                  placeholder="Ảnh"
                  type="file"
                  className="Input"
                />
                <input
                  style={{
                    display: "none",
                  }}
                  ref={imageSecondRef}
                  onChange={handleChangeFileImageSecond}
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
            <Row>
              <Col span={8}>
                <AddImage
                  txt={" + Ảnh cầu thủ"}
                  url={url}
                  click={() => fileRef.current.click()}
                />
                <div style={{ textAlign: "center" }} className="txt-err">
                  {err?.imageAvatar}
                </div>
              </Col>
              <Col span={8}>
                <AddImage
                  txt={" + Ảnh áo sân nhà"}
                  url={imageFirstJersey}
                  click={() => imageFirstRef.current.click()}
                />
                <div style={{ textAlign: "center" }} className="txt-err">
                  {err?.imageFirstJersey}
                </div>
              </Col>
              <Col span={8}>
                <AddImage
                  txt={" + Ảnh áo sân khách"}
                  url={imageSecondJersey}
                  click={() => imageSecondRef.current.click()}
                />
                <div style={{ textAlign: "center" }} className="txt-err">
                  {err?.imageSecondJersey}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <LoadingFull show={loading} />
      </div>
    </Card>
  );
};

export default AddPlayerForm;
