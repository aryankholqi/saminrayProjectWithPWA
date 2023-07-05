import axios from "axios";

const fetchProduct = ()=>{
    return axios({
        url:"https://fakestoreapi.com/products",
        method:"GET",
    })
}

export default fetchProduct