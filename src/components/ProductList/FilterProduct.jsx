import React, { useEffect, useState } from "react";
import { Form, Select, InputNumber, Button, message } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { productApi } from "../../api/product.api";
import "./ProductList.scss"
const { Option } = Select;

const categories = ["Electronics", "Clothing", "Books"];

const ProductFilter = ({
  onFilter = () => {},
  filter = {
    categoryName: "",
    categoryName: "",
    maxPrice: "",
    sortType: "",
    minPrice: "",
  },
  setFillter = () => {},
}) => {
  const [listCategory, setListCategory] = useState([]);
  const handleSubmit = () => {
    if((filter.maxPrice && isNaN(filter.maxPrice)) || (filter.minPrice&& isNaN(filter.minPrice))){
        message.error("Giá phải là kiểu số");
        return;
    }
    if(filter.minPrice && filter.maxPrice && (filter.minPrice > filter.maxPrice)){
        message.error("Giá thấp nhất phải bé hơn hoặc bằng giá lớn nhất");
        return;
    }
    onFilter(filter)
  };

  const getListCategoryProduct = async () => {
    try {
      const res = await productApi.getListCategory();
      setListCategory(
        res?.data?.data?.map((i) => ({
          key: i.name,
          value: i.name,
        })) || []
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getListCategoryProduct();
  }, []);
  return (
    <Form className="filter-wrap" layout="inline" onFinish={handleSubmit}>
      <Form.Item label="Danh mục sản phẩm">
        <Select
          placeholder="Chọn danh mục sản phẩm"
          allowClear
          style={{ width: 150 }}
          value={filter.categoryName}
          onChange={(v) => setFillter({ ...filter, categoryName: v })}
        >
             <Option value={""}>
             Tất cả danh mục
            </Option>
          {listCategory.map((category) => (
            
            <Option key={category} value={category.value}>
              {category.value}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Giá từ">
        <InputNumber
          min={0}
          onChange={(value) => {
            setFillter({ ...filter, minPrice: value });
          }}
          placeholder="Giá thấp nhất"
          style={{ width: 150 }}
          value={filter.minPrice}
        />
      </Form.Item>
      <Form.Item label="Đến giá">
        <InputNumber
          min={0}
          onChange={(value) => {
            setFillter({ ...filter, maxPrice: value });
          }}
          placeholder="Giá cao nhất"
          style={{ width: 150 }}
          value={filter.maxPrice}
        />
      </Form.Item>
      <Form.Item label="Sắp xếp">
        <Select
          placeholder="Sắp xếp"
          onChange={(value) => {
            setFillter({ ...filter, sortType: value });
          }}
          allowClear
          style={{ width: 150 }}
          value={filter.sortType}
        >
          <Option value="Giảm dần">Giá từ thấp đến cao</Option>
          <Option value="Tăng dần">Giá từ cao đến thấp</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button style={{
            background:"rgb(41, 174, 189)"
        }
        } type="primary" htmlType="submit" icon={<FilterOutlined />}>
          Lọc
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductFilter;
