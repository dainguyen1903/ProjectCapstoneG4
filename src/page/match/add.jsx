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
  Avatar,
} from "antd";
import { useMatch, useMatches, useNavigate, useParams } from "react-router";
import moment from "moment";
import useMatchStore from "../../zustand/matchStore";
import LoadingFull from "../../component/loading/loadingFull";
import { matchApi } from "../../api/match.api";
import { handleError, showMessErr400 } from "../../ultis/helper";
const { Option } = Select;

const AddMatchForm = () => {
  const { id } = useParams();

  const addMatch = useMatchStore((state) => state.addMatch);
  const updateMatch = useMatchStore((state) => state.updateMatch);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const matches = useMatchStore((state) => state.matches);
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");
  const navigate = useNavigate();
  const [imageAwayTeam, setImageAwayTeam] = useState("");
  const [imageHomeTeam, setImageHomeTeam] = useState("");
  const homeTeamRef = useRef();
  const awayRef = useRef()

  let detail = matches.find((i) => i.id == id) || {};
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
    Modal.confirm({
      title: "Xác nhận",
      content: id ? "Thêm lịch thi đấu" : "Cập nhật lịch thi đấu",
      onOk: async () => {
        try {
          const dataPosst = JSON.parse(JSON.stringify(values));
          const birdday = dataPosst.dateTime;
          dataPosst.dateTime = moment(birdday).format("YYYY-MM-DDTHH:mm:ss");
          if (status != "0") {
            dataPosst.awayScore = awayScore;
            dataPosst.homeScore = homeScore;
          }
          dataPosst.status = true;
          dataPosst.imageAwayTeam = imageAwayTeam;
          dataPosst.imageHomeTeam = imageHomeTeam;
          const res = !id
            ? await matchApi.creatermatch({
                ...dataPosst,
              })
            : await matchApi.updatematch(id, dataPosst);
          if (res.data.status === 200 || res.data.status === 204) {
            Modal.success({
              title: "Thành công",
              content: !id ? "Thêm thành công" : "Cập nhật thành công",
            });
            navigate(-1);
          } else {
          showMessErr400(res)
          }
        } catch (error) {
          console.log(error)
         handleError(error)
        }
      },
    });
  };

  // Get detail
  const getDetail = async () => {
    try {
      setLoading(true);
      const res = await matchApi.getDetailmatch(id);
      if (res.data.status === 200 || res.status.data === 204) {
        const detail = res.data.data;
        setStatus(detail.statusMatch);
        setHomeScore(detail?.homeScore);
        setAwayScore(detail?.awayScore);
        setImageAwayTeam(detail?.imageAwayTeam);
        setImageHomeTeam(detail?.imageHomeTeam)
        detail.dateTime = detail.dateTime ? moment(detail.dateTime) : null;
        form.setFieldsValue({...detail,priceOfTicket:Math.ceil(Number(detail.priceOfTicket))});
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      getDetail();
    }
  }, [id]);
  const handleChangeFile = (type) => e => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
      const url  = reader.result;
      if(type == 1){
        setImageHomeTeam(url)
      }
      else{
        setImageAwayTeam(url)
      }
    };
    reader.readAsDataURL(file);
  }
  return (
    <Card>
      <Form
        form={form}
        name="addMatchForm"
        wrapperCol={{ span: 12 }}
        onFinish={onFinish}
      >
        <h2 style={{ marginBottom: 10 }}>
          {!id ? "Thêm lịch thi đấu" : "Cập nhật lịch thi đấu"}
        </h2>
        <div className="inputLabel">Tên giải đấu</div>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên giải đấu!" }]}
        >
          <Input placeholder="Tên Giải Đấu" className="Input" />
        </Form.Item>
        <div className="inputLabel">Vòng đấu</div>
        <Form.Item
          name="round"
          rules={[{ required: true, message: "Vui lòng nhập vòng đấu!" }]}
        >
          <Input placeholder="Vòng Đấu" className="Input" />
        </Form.Item>
        {/* <div className="inputLabel">Đội nhà</div>
        <Form.Item
          name="homeTeam"
          rules={[{ required: true, message: "Vui lòng nhập tên đội nhà!" }]}
        >
          <Input placeholder="Đội Nhà" className="Input" />
        </Form.Item> */}
        <div style={{width:"calc(50% + 55px)"}} className="flex-start">
          <div style={{width:"100%"}}>
            <div className="inputLabel">Đội nhà</div>

            <Form.Item
              name="homeTeam"
              rules={[
                { required: true, message: "Vui lòng nhập tên đội nhà!" },
              ]}
            >
              <Input  style={{width:"calc(200% + 55px)"}} placeholder="Đội nhà" className="Input" />
            </Form.Item>
          </div>
          <input ref={homeTeamRef} type="file" onChange={handleChangeFile(1)} style={{display:"none"}}  />
          <Avatar onClick={() => homeTeamRef.current.click()} size={30} style={{marginTop:15,marginLeft:70,width:60,height:50,cursor:"pointer"}} src={imageHomeTeam} />
        </div>
        <div style={{width:"calc(50% + 55px)"}} className="flex-start">
          <div style={{width:"100%"}}>
            <div className="inputLabel">Đội khách</div>

            <Form.Item
              name="awayTeam"
              rules={[
                { required: true, message: "Vui lòng nhập tên đội khách!" },
              ]}
            >
              <Input  style={{width:"calc(200% + 55px)"}} placeholder="Đội Khách" className="Input" />
            </Form.Item>
          </div>
          <input ref={awayRef} type="file" onChange={handleChangeFile(2)} style={{display:"none"}}  />

          <Avatar onClick={() => awayRef.current.click()} size={30} style={{marginTop:15,marginLeft:70,width:60,height:50,cursor:"pointer"}} src={imageAwayTeam} />
        </div>
        <div className="inputLabel">Ngày giờ thi đấu</div>
        <Form.Item
          name="dateTime"
          rules={[
            { required: true, message: "Vui lòng chọn ngày và giờ thi đấu!" },
          ]}
        >
          <DatePicker
            showTime
            format="DD-MM-YYYY HH:mm:ss"
            placeholder="Ngày và Giờ"
            className="Input"
          />
        </Form.Item>
        <div className="inputLabel">Sân vận động</div>
        <Form.Item
          name="location"
          rules={[
            { required: true, message: "Vui lòng nhập tên sân vận động!" },
          ]}
        >
          <Input placeholder="Sân Vận Động" className="Input" />
        </Form.Item>
        <div
          style={{
            marginBottom: 5,
          }}
          className="inputLabel"
        >
          Tình trạng trận đấu
        </div>
        <Form.Item
          name="statusMatch"
          rules={[
            { required: true, message: "Vui lòng chọn tình trạng trận đấu!" },
          ]}
        >
          <Select
            onChange={(v) => setStatus(v)}
            placeholder="Tình Trạng Trận Đấu"
            className="Select"
          >
            <Option value="0">Chưa Bắt Đầu</Option>
            <Option value="1">Đang Diễn Ra</Option>
            <Option value="2">Đã Kết Thúc</Option>
          </Select>
        </Form.Item>
        {status && status != "0" && (
          <>
            <div className="inputLabel">Kết quả trận đấu</div>
            <div
              style={{
                display: "flex",
                gap: 20,
              }}
            >
              <div>
                <div style={{ marginTop: 5, marginBottom: -5 }}>Đội nhà</div>

                <Input
                  type="number"
                  value={homeScore}
                  onChange={(e) => setHomeScore(e.target.value)}
                  setVal
                  style={{ marginRight: 10 }}
                  placeholder="Đội nhà"
                  className="Input"
                />
              </div>
              <div>
                <div style={{ marginTop: 5, marginBottom: -5 }}>Đội khách</div>
                <Input
                  value={awayScore}
                  onChange={(e) => setAwayScore(e.target.value)}
                  type="number"
                  placeholder="Đội khách"
                  className="Input"
                />
              </div>
            </div>
          </>
        )}
        <div className="inputLabel">Tổng số vé</div>
        <Form.Item
          name="numberOfTicket"
          rules={[{ required: true, message: "Vui lòng nhập tổng số vé!" }]}
        >
          <Input type="number" placeholder="Tổng số vé" className="Input" />
        </Form.Item>
        <div className="inputLabel">Giá vé</div>
        <Form.Item
          name="priceOfTicket"
          rules={[{ required: true, message: "Vui lòng nhập giá vé!" }]}
        >
          <Input type="number" placeholder="Giá vé" className="Input" />
        </Form.Item>
        {/* <div className="inputLabel">Số vé đã bán</div>
        <Form.Item
          name="numberOfTicketsSold"
          rules={[{ required: true, message: "Vui lòng nhập số vé đã bán" }]}
        >
          <Input type="number" placeholder="Số vé đã bán" className="Input" />
        </Form.Item> */}
        <Form.Item>
          <button
            style={{
              marginTop: 15,
            }}
            className="Button"
            htmlType="submit"
            type="primary"
          >
            {!id ? "Tạo mới" : "Cập nhật"}
          </button>
        </Form.Item>
        <LoadingFull show={loading} />
      </Form>
    </Card>
  );
};

export default AddMatchForm;
