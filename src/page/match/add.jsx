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
import {
  ERROR_KEY,
  handleError,
  objectCheckErrorInput,
  showMessErr400,
} from "../../ultis/helper";
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
  const awayRef = useRef();

  let detail = matches.find((i) => i.id == id) || {};
  const [form] = Form.useForm();
  const onFinish = (values) => {
    if (isErr) {
      return;
    }
    if (!validate()) {
      return;
    }
    Modal.confirm({
      title: "Xác nhận",
      content: id ? "Thêm lịch thi đấu" : "Cập nhật lịch thi đấu",
      onOk: async () => {
        try {
          const dataPosst = JSON.parse(JSON.stringify(data));
          const birdday = dataPosst.dateTime;
          dataPosst.dateTime = moment(birdday).format("YYYY-MM-DDTHH:mm:ss");
          if (data.statusMatch != "0") {
            dataPosst.awayScore = data.awayScore;
            dataPosst.homeScore = data.homeScore;
          } else {
            dataPosst.awayScore = 0;
            dataPosst.homeScore = 0;
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
            showMessErr400(res);
          }
        } catch (error) {
          console.log(error);
          handleError(error);
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
        setImageHomeTeam(detail?.imageHomeTeam);
        detail.dateTime = detail.dateTime ? moment(detail.dateTime) : null;
        setData({
          ...detail,
          priceOfTicket: Math.ceil(Number(detail.priceOfTicket)),
        });
        // form.setFieldsValue({
        //   ...detail,
        //   priceOfTicket: Math.ceil(Number(detail.priceOfTicket)),
        // });
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
  const handleChangeFile = (type) => (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
      const url = reader.result;
      if (type == 1) {
        setImageHomeTeam(url);
      } else {
        setImageAwayTeam(url);
      }
    };
    reader.readAsDataURL(file);
  };

  /// DATA
  const [data, setData] = useState({
    name: "",
    round: "",
    homeTeam: "",
    awayTeam: "",
    dateTime: null,
    location: "",
    statusMatch: "",
    numberOfTicket: "",
    priceOfTicket: "",
    homeScore: "",
    awayScore: "",
  });
  const [err, setErr] = useState({
    name: "",
    round: "",
    homeTeam: "",
    awayTeam: "",
    dateTime: null,
    location: "",
    statusMatch: "",
    numberOfTicket: "",
    priceOfTicket: "",
    imageAwayTeam: "",
    imageHomeTeam: "",
    homeScore: "",
    awayScore: "",
  });
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
  const handleSetErr = (field, value) => {
    setErr((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  //
  const isEmptyScore = (value) => {
    console.log(value)
    return !value && value !== 0 && value !== "0"
  };
  const validate = () => {
    let newErr = { ...err };
    let isFlagErr = false;
    if (!data.name) {
      isFlagErr = true;
      newErr = { ...newErr, name: "Tên giải đấu không được để trống" };
    } else {
      newErr = { ...newErr, name: "" };
    }
    if (!data.round) {
      isFlagErr = true;
      newErr = { ...newErr, round: "Vòng đấu không được để trống" };
    } else {
      newErr = { ...newErr, round: "" };
    }
    if (!data.homeTeam) {
      isFlagErr = true;
      newErr = {
        ...newErr,
        homeTeam: "Đội nhà không được để trống",
      };
    } else {
      newErr = { ...newErr, homeTeam: "" };
    }
    if (!data.awayTeam) {
      isFlagErr = true;
      newErr = { ...newErr, awayTeam: "Đội khách không được để trống" };
    } else {
      newErr = { ...newErr, awayTeam: "" };
    }
    if (!data.dateTime) {
      isFlagErr = true;
      newErr = {
        ...newErr,
        dateTime: "Ngày và giờ thi đấu không được để trống",
      };
    } else {
      newErr = { ...newErr, dateTime: "" };
    }
    if (!data.location) {
      isFlagErr = true;
      newErr = { ...newErr, location: "Sân vận động không được để trống" };
    } else {
      newErr = { ...newErr, location: "" };
    }
    if (!data.statusMatch) {
      isFlagErr = true;
      newErr = {
        ...newErr,
        statusMatch: "Tình trạng trận đấu không được để trống",
      };
    } else {
      newErr = { ...newErr, statusMatch: "" };
    }
    if (!data.priceOfTicket) {
      isFlagErr = true;
      newErr = { ...newErr, priceOfTicket: "Giá vé không được để trống" };
    } else {
      newErr = { ...newErr, priceOfTicket: "" };
    }
    if (!data.numberOfTicket) {
      isFlagErr = true;
      newErr = { ...newErr, numberOfTicket: "Tổng số vé không được để trống" };
    } else {
      newErr = { ...newErr, numberOfTicket: "" };
    }
    console.log(isEmptyScore(data.homeScore))
    if (data.statusMatch !== "0" && isEmptyScore(data.homeScore)) {
      isFlagErr = true;
      newErr = {
        ...newErr,
        homeScore: "Bàn thắng đội nhà không được để trống",
      };
    } else {
      newErr = { ...newErr, homeScore: "" };
    }
    if (data.statusMatch !== "0" && isEmptyScore(data.awayScore)) {
      isFlagErr = true;
      newErr = {
        ...newErr,
        awayScore: "Bàn thắng đội khách không được để trống",
      };
    } else {
      newErr = { ...newErr, awayScore: "" };
    }
    
    setErr(newErr);
    return !isFlagErr;
  };
  const isErr = Object.values(err).filter((i) => i)?.length > 0;
  console.log(err)
useEffect(() => {
  if(data.statusMatch === "0"){
    setErr({...err,homeScore:"",awayScore:""})
  }
},[data.statusMatch])
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
        <Form.Item name="name">
          <Input
            value={data.name}
            onChange={(e) =>
              handleChange(
                "name",
                e.target.value,
                [ERROR_KEY.BLANK],
                "Tên giải đấu"
              )
            }
            placeholder="Tên Giải Đấu"
            className="Input"
          />
          <div className="txt-err">{err?.name}</div>
        </Form.Item>
        <div className="inputLabel">Vòng đấu</div>
        <Form.Item name="round">
          <Input
            value={data.round}
            onChange={(e) =>
              handleChange(
                "round",
                e.target.value,
                [ERROR_KEY.BLANK],
                "Vòng Đấu"
              )
            }
            placeholder="Vòng Đấu"
            className="Input"
          />
          <div className="txt-err">{err?.round}</div>
        </Form.Item>

        <div style={{ width: "calc(50% + 55px)" }} className="flex-start">
          <div style={{ width: "100%" }}>
            <div className="inputLabel">Đội nhà</div>

            <Form.Item>
              <Input
                value={data.homeTeam}
                onChange={(e) =>
                  handleChange(
                    "homeTeam",
                    e.target.value,
                    [ERROR_KEY.BLANK],
                    "Tên đội nhà"
                  )
                }
                style={{ width: "calc(200% + 55px)" }}
                placeholder="Đội nhà"
                className="Input"
              />
              <div className="txt-err">{err?.homeTeam}</div>
            </Form.Item>
          </div>
          <input
            ref={homeTeamRef}
            type="file"
            onChange={handleChangeFile(1)}
            style={{ display: "none" }}
          />
          <Avatar
            onClick={() => homeTeamRef.current.click()}
            size={30}
            style={{
              marginTop: 15,
              marginLeft: 70,
              width: 60,
              height: 50,
              cursor: "pointer",
            }}
            src={imageHomeTeam}
          />
        </div>
        <div style={{ width: "calc(50% + 55px)" }} className="flex-start">
          <div style={{ width: "100%" }}>
            <div className="inputLabel">Đội khách</div>

            <Form.Item name="awayTeam">
              <Input
                value={data.awayTeam}
                onChange={(e) =>
                  handleChange(
                    "awayTeam",
                    e.target.value,
                    [ERROR_KEY.BLANK],
                    "Tên đội khách"
                  )
                }
                style={{ width: "calc(200% + 55px)" }}
                placeholder="Đội Khách"
                className="Input"
              />
              <div className="txt-err">{err?.awayTeam}</div>
            </Form.Item>
          </div>
          <input
            ref={awayRef}
            type="file"
            onChange={handleChangeFile(2)}
            style={{ display: "none" }}
          />

          <Avatar
            onClick={() => awayRef.current.click()}
            size={30}
            style={{
              marginTop: 15,
              marginLeft: 70,
              width: 60,
              height: 50,
              cursor: "pointer",
            }}
            src={imageAwayTeam}
          />
          <div className="txt-err">{err?.imageAwayTeam}</div>
        </div>
        <div className="inputLabel">Ngày giờ thi đấu</div>
        <Form.Item name="dateTime">
          <DatePicker
            inputReadOnly
            showTime
            format="DD-MM-YYYY HH:mm:ss"
            placeholder="Ngày và Giờ"
            className="Input"
            value={data.dateTime}
            onChange={(date) => {
              setData({ ...data, dateTime: date });
              setErr({ ...err, dateTime: "" });
            }}
          />
          <div className="txt-err">{err?.dateTime}</div>
        </Form.Item>
        <div className="inputLabel">Sân vận động</div>
        <Form.Item name="location">
          <Input
            value={data.location}
            onChange={(e) =>
              handleChange(
                "location",
                e.target.value,
                [ERROR_KEY.BLANK],
                "Sân vân động"
              )
            }
            placeholder="Sân Vận Động"
            className="Input"
          />
          <div className="txt-err">{err?.location}</div>
        </Form.Item>
        <div
          style={{
            marginBottom: 5,
          }}
          className="inputLabel"
        >
          Tình trạng trận đấu
        </div>
        <Form.Item>
          <Select
            value={data.statusMatch}
            onChange={(v) => {
              setData({ ...data, statusMatch: v });
              setErr({ ...err, statusMatch: "" });
            }}
            placeholder="Tình Trạng Trận Đấu"
            className="Select"
          >
            <Option value="0">Chưa Bắt Đầu</Option>
            <Option value="1">Đang Diễn Ra</Option>
            <Option value="2">Đã Kết Thúc</Option>
          </Select>
          <div className="txt-err">{err?.statusMatch}</div>
        </Form.Item>
        {data.statusMatch && data.statusMatch != "0" && (
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
                  value={data.homeScore}
                  onChange={(e) => {
                    if (data.statusMatch === "0") {
                      setErr({ ...err, homeScore: "" });
                    } else {
                    }

                    handleChange(
                      "homeScore",
                      e.target.value,
                      [
                        ERROR_KEY.BLANK,
                        ERROR_KEY.NUMER,
                        ERROR_KEY.NUMBER_UNSIGN,
                      ],
                      "Bàn thắng đội nhà"
                    );
                  }}
                  
                  style={{ marginRight: 10 }}
                  placeholder="Đội nhà"
                  className="Input"
                />
                <div className="txt-err">{err?.homeScore}</div>
              </div>
              <div>
                <div style={{ marginTop: 5, marginBottom: -5 }}>Đội khách</div>
                <Input
                   value={data.awayScore}
                   onChange={(e) => {
                    if (data.statusMatch === "0") {
                      setErr({ ...err, awayScore: "" });
                    } else {
                    }

                    handleChange(
                      "awayScore",
                      e.target.value,
                      [
                        ERROR_KEY.BLANK,
                        ERROR_KEY.NUMER,
                        ERROR_KEY.NUMBER_UNSIGN,
                      ],
                      "Bàn thắng đội khách"
                    );
                  }}
                  type="number"
                  placeholder="Đội khách"
                  className="Input"
                />
                <div className="txt-err">{err?.awayScore}</div>
              </div>
            </div>
          </>
        )}
        <div className="inputLabel">Tổng số vé</div>
        <Form.Item name="numberOfTicket">
          <Input
            value={data.numberOfTicket}
            onChange={(e) =>
              handleChange(
                "numberOfTicket",
                e.target.value,
                [ERROR_KEY.BLANK, ERROR_KEY.NUMER, ERROR_KEY.NUMBER_UNSIGN],
                "Tổng số vé"
              )
            }
            type="number"
            placeholder="Tổng số vé"
            className="Input"
          />
          <div className="txt-err">{err?.numberOfTicket}</div>
        </Form.Item>
        <div className="inputLabel">Giá vé</div>
        <Form.Item name="priceOfTicket">
          <Input
            value={data.priceOfTicket}
            onChange={(e) =>
              handleChange(
                "priceOfTicket",
                e.target.value,
                [ERROR_KEY.BLANK, ERROR_KEY.NUMER, ERROR_KEY.NUMBER_UNSIGN],
                "Giá vé"
              )
            }
            type="number"
            placeholder="Giá vé"
            className="Input"
          />
          <div className="txt-err">{err?.priceOfTicket}</div>
        </Form.Item>

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
