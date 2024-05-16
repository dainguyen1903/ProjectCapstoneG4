import { Select } from "antd";
import { useEffect, useState } from "react";

function Province({
  state = {
    province: "",
    district: "",
    ward: "",
  },
  setStateData,
  width = 400,
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
    return list.map((item) => (
      <Select.Option value={item.name}>{item.name}</Select.Option>
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

  useEffect(() => {
   setStateData({...state,district:"",ward:""})
  },[state.province])
  
  useEffect(() => {
    setStateData({...state,ward:""})
   },[state.district])
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
        <p>Tỉnh/Thành phố</p>
        <Select
          value={state.province}
          onChange={(v) => setStateData({ ...state, province: v })}
          style={{ width }}
        >
          {renderListOption(listProvince)}
        </Select>
      </div>
      <div style={{marginTop:10,width:"100%"}} >
        <p>Quận/Huyện</p>
        <Select
          disabled={!state.province}
          value={state.district}
          onChange={(v) => setStateData({ ...state, district: v })}
          style={{ width }}
        >
          {renderListOption(listDistrict)}
        </Select>
      </div>
      <div style={{marginTop:10,width:"100%"}}>
        <p>Phường/Xã</p>
        <Select
          disabled={!state.district}
          value={state.ward}
          onChange={(v) => setStateData({ ...state, ward: v })}
          style={{ width }}
        >
          {renderListOption(listWard)}
        </Select>
      </div>
    </div>
  );
}

export default Province;