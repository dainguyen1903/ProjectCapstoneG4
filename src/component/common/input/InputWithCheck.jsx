import { Input } from "antd";

const InputWithCheck = (name) => {
  return(
<>
<Input placeholder="Họ và tên đệm" className="Input" name={name} />
</>
  )
};
export default InputWithCheck;
