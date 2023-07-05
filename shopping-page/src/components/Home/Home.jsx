import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import ProductCard from '../ProductCard/ProductCard';
import fetchProduct from '../../api/productApi/productApi';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Select from "react-select"
import "./Home.css"

const options = [
  { value: "Default", label: "پیش فرض" },
  { value: "Most Popular", label: "محبوب ترین" },
  { value: "Low to High", label: "ارزانترین به گرانترین" },
  { value: "High to Low", label: "گرانترین به ارزانترین" },
]
export default function Home() {
  const [selectedOption, setSelectedOption] = useState(null)
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [paginatedProducts, setPaginatedProducts] = useState([])
  let pageSize = 8
  let pagesNumber
  useEffect(() => {
    fetchProduct()
      .then(res => {
        setProducts(res.data)
        let endIndex = pageSize * currentPage
        let startIndex = endIndex - pageSize
        let allShownProducts = res.data.slice(startIndex, endIndex)
        setPaginatedProducts(allShownProducts)
      })
  }, [])
  const pagesCount = Math.ceil(products.length / pageSize)
  pagesNumber = Array.from(Array(pagesCount).keys())

  function changePaginate(newPage) {
    setCurrentPage(newPage)
    let endIndex = pageSize * newPage
    let startIndex = endIndex - pageSize
    let allShownProducts = products.slice(startIndex, endIndex)
    setPaginatedProducts(allShownProducts)
  }
  function changeSortHandler(event) {
    if (event.value === "Most Popular") {
      let sortedArray = products.sort((a, b) => {
        return b.rating.rate - a.rating.rate
      })
      setProducts(sortedArray)
      console.log(products);
      let endIndex = pageSize * currentPage
      let startIndex = endIndex - pageSize
      let allShownProducts = products.slice(startIndex, endIndex)
      setPaginatedProducts(allShownProducts)
    }
    if (event.value === "Default") {
      let sortedArray = products.sort((a, b) => {
        return a.id - b.id
      })
      setProducts(sortedArray)
      let endIndex = pageSize * currentPage
      let startIndex = endIndex - pageSize
      let allShownProducts = products.slice(startIndex, endIndex)
      setPaginatedProducts(allShownProducts)
    }
    if (event.value === "Low to High") {
      let sortedArray = products.sort((a, b) => {
        return a.price - b.price
      })
      setProducts(sortedArray)
      let endIndex = pageSize * currentPage
      let startIndex = endIndex - pageSize
      let allShownProducts = products.slice(startIndex, endIndex)
      setPaginatedProducts(allShownProducts)
    }
    if (event.value === "High to Low") {
      let sortedArray = products.sort((a, b) => {
        return b.price - a.price
      })
      setProducts(sortedArray)
      let endIndex = pageSize * currentPage
      let startIndex = endIndex - pageSize
      let allShownProducts = products.slice(startIndex, endIndex)
      setPaginatedProducts(allShownProducts)
    }
  }
  return (
    <div className='home-page p-4'>
      <Navbar />
      <h1 className='home-page-brand text-center text-md-end mb-5'>Veema</h1>
      <h1 className='home-page-title text-center'>به فروشگاه <span style={{color:"#8AAAE5"}}>ویما</span> خوش آمدید.</h1>
      <div className='products-section'>
        <h3 className='products-section-title mb-4'>محصولات</h3>
        <div className='products-container mx-auto p-3'>
          <div className='products-groupby-section d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center w-50 w-md-25'>
              <span>دسته بندی: </span>
              <Select
                defaultValue={selectedOption}
                onChange={(event) => changeSortHandler(event)}
                options={options}
                placeholder="لطفا انتخاب کنید:"
              />
            </div>
            <FilterAltIcon className='filter-icon rounded-pill' />
          </div>
          <hr style={{ borderTop: "5px solid" }} />
          <div className='product-cards-section mt-5 row'>
            {
              paginatedProducts &&
              paginatedProducts.map((product) => (
                <div className='col-md-3' key={product.id}>
                  <ProductCard {...product} />
                </div>
              ))
            }
          </div>
          <hr style={{ borderTop: "5px solid" }} />
          <nav>
            <ul className="pagination justify-content-center">
              {
                pagesNumber.map((pageNumber) => (
                  <li className={pageNumber + 1 === currentPage ? "page-item active" : "page-item"} key={pageNumber + 1} onClick={() => changePaginate(pageNumber + 1)}><a className="page-link">{pageNumber + 1}</a></li>
                ))
              }
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}
