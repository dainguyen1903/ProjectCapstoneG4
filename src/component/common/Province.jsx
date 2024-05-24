import { Select } from "antd";
import { useEffect, useState } from "react";

function Province({
  state = {
    province: "",
    district: "",
    ward: "",
  },
  setStateData = (data)=>{},
  width = 400,
  bold=false,
  disabledProvince=false
  
}) {
  const [count, setCount] = useState(0);
  //   const [data,setData] = useState(state);
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);

  const getListProvince = async () => {
    fetch(
      "https://raw.githubusercontent.com/phuockaito/KaitoShop.cf/master/src/data.json"
    ).then((res) =>
      res.json().then((city) => {
        setListProvince(city);
      })
    );
  };

  useEffect(() => {
    getListProvince();
  }, []);
  const renderListOption = (list) => {
    return list.map((item,index) => (
      <Option value={item.name}>{item.name}</Option>
    ));
  };
  useEffect(() => {
    if (state.province && listProvince.length > 0) {
      const listDistrictByProvince =
        listProvince.find((i) => i.name === state.province)?.huyen || [];
      setListDistrict(listDistrictByProvince);
    }
  }, [state.province, listProvince]);
  useEffect(() => {
    if (
      state.province &&
      state.district &&
      listDistrict.length > 0 &&
      listProvince.length > 0
    ) {
      const listWard1 =
        listDistrict.find((i) => i.name === state.district)?.xa || [];
      setListWard(listWard1);
    }
  }, [state.province, listProvince, listDistrict, state.district]);
console.log(state)
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
        width:"100%"
      }}
    >
      <div style={{marginTop:10,width:"100%"}}>
      <div style={{fontWeight:"bold",display:"inline-block",marginBottom:5}}>Địa chỉ thường trú</div>

        <span style={{fontWeight:bold ? "bold" :"",display:"inline-block",marginBottom:5}}>Tỉnh/Thành phố</span>
        <Select
        disabled={disabledProvince}
         className="ant-input css-dev-only-do-not-override-1uweeqc ant-input-outlined ant-input-status-success Select"
          value={state.province}
          onChange={(v) => setStateData({ ...state, province: v,district:"",ward:""})}
          style={{ width }}
        >
            <Option value={null}>{""}</Option>
          {renderListOption(listProvince)}
        </Select>
      </div>
      <div style={{marginTop:10,width:"100%"}} >
        <span style={{fontWeight:bold ? "bold" :"",display:"inline-block",marginBottom:5}}>Quận/Huyện</span>
        <Select
         className="ant-input css-dev-only-do-not-override-1uweeqc ant-input-outlined ant-input-status-success Select "
          disabled={!state.province}
          value={state.district}
          onChange={(v) => setStateData({ ...state, district:  v,ward:"" })}
          style={{ width }}
        >
           <Option value={null}>{""}</Option>
          {renderListOption(listDistrict)}
        </Select>
      </div>
      <div style={{marginTop:10,width:"100%"}}>
        <span style={{fontWeight:bold ? "bold" :"",display:"inline-block",marginBottom:5}}>Phường/Xã</span>
        <Select

        className="Select" 
          disabled={!state.district}
          value={state.ward}
          onChange={(v) => setStateData({ ...state, ward:  v })}
          style={{ width }}
        >
           <Option value={""}>{""}</Option>
          {renderListOption(listWard)}
        </Select>
      </div>
    </div>
  );
}

export default Province;