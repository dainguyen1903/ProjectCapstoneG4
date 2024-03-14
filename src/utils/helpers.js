export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: "USD"
    }).format(price);
}


export const  getQueryParams =() =>  {
    const searchParams = new URLSearchParams(window.location.search);
    const queryParams = {};
  
    // Lặp qua các query string và thêm vào object queryParams
    for (const [key, value] of searchParams.entries()) {
      queryParams[key] = value;
    }
  
    return queryParams;
  }