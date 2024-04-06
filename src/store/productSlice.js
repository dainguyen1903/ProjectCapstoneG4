import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";
import { productApi } from "../api/product.api";

const initialState = {
    products: [],
    productsStatus: STATUS.IDLE,
    productSingle: [],
    productSingleStatus: STATUS.IDLE
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAsyncProducts.pending, (state, action) => {
            state.productsStatus = STATUS.LOADING;
        })

        .addCase(fetchAsyncProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.productsStatus = STATUS.SUCCEEDED;
        })
        
        .addCase(fetchAsyncProducts.rejected, (state, action) => {
            state.productsStatus = STATUS.FAILED
        })

        .addCase(fetchAsyncProductSingle.pending, (state, action) => {
            state.productSingleStatus = STATUS.LOADING;
        })

        .addCase(fetchAsyncProductSingle.fulfilled, (state, action) => {
            state.productSingle = action.payload;
            state.productSingleStatus = STATUS.SUCCEEDED;
        })

        .addCase(fetchAsyncProductSingle.rejected, (state, action) => {
            state.productSingleStatus = STATUS.FAILED;
        })
    }
});

// for getting the products list with limited numbers
export const fetchAsyncProducts = createAsyncThunk('products/fetch', async(search,{rejectWithValue}) => {
    const response = await productApi.searchProduct({productName:search});
    if(response.data.status === 200){
        return response.data.data ? response.data.data.reverse() :[]
    }
   else{
    return rejectWithValue(response.data.message)
   }
});

// getting the single product data also
export const fetchAsyncProductSingle = createAsyncThunk('product-single/fetch', async(id,{rejectWithValue}) => {
    const response = await productApi.getDetailProduct(id);
    if(response.data.status === 200){
        return response.data.data
    }
   else{
    return rejectWithValue(response.data.message)
   }
});


export const getAllProducts = (state) => state.product.products;
export const getAllProductsStatus = (state) => state.product.productsStatus;
export const getProductSingle = (state) => state.product.productSingle;
export const getSingleProductStatus = (state) => state.product.productSingleStatus;
export default productSlice.reducer;