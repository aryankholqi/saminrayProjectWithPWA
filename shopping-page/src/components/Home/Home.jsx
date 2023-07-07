import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import ProductCard from '../ProductCard/ProductCard';
import fetchProduct from '../../api/productApi/productApi';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Select from "react-select"
import "./Home.css"
import { Link } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

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
  const [pagesCount, setPagesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true)

  let pageSize = 9
  let pagesNumber
  useEffect(() => {
    fetchProduct()
      .then(res => {
        setProducts(res.data)
        setPagesCount(Math.ceil(res.data.length / pageSize))
        let endIndex = pageSize * currentPage
        let startIndex = endIndex - pageSize
        let allShownProducts = res.data.slice(startIndex, endIndex)
        setPaginatedProducts(allShownProducts)
        setIsLoading(false)
      })
  }, [])
  pagesNumber = Array.from(Array(pagesCount).keys());
  function changePaginate(newPage) {
    setCurrentPage(newPage)
    let endIndex = pageSize * newPage
    let startIndex = endIndex - pageSize
    let allShownProducts = products.slice(startIndex, endIndex)
    setPaginatedProducts(allShownProducts)
  }
  function changeSortHandler(event) {
    let sortedArray = [...products]

    if (event.value === "Most Popular") {
      sortedArray.sort((a, b) => b.rating.rate - a.rating.rate);
    } else if (event.value === "Default") {
      sortedArray.sort((a, b) => a.id - b.id);
    } else if (event.value === "Low to High") {
      sortedArray.sort((a, b) => a.price - b.price);
    } else if (event.value === "High to Low") {
      sortedArray.sort((a, b) => b.price - a.price);
    }
    setProducts(sortedArray);
    let endIndex = pageSize * currentPage;
    let startIndex = endIndex - pageSize;
    let allShownProducts = sortedArray.slice(startIndex, endIndex);
    setPaginatedProducts(allShownProducts);
  }
  function setGroupByHandler(event) {
    let filteredArray = products.filter((product) => product.category === event.target.value);
    setPagesCount(Math.ceil(filteredArray.length / pageSize))

    let endIndex = pageSize * currentPage;
    let startIndex = endIndex - pageSize;
    let allShownProducts = filteredArray.slice(startIndex, endIndex);
    setPaginatedProducts(allShownProducts);
  }
  return (
    <div className='home-page p-2'>
      <Navbar />
      <h1 className='home-page-title text-center'>به فروشگاه <span style={{ color: "#8AAAE5" }}>ویما</span> خوش آمدید.</h1>
      <div className='products-section'>
        <h3 className='products-section-title mb-4'>محصولات</h3>
        <div className='w-100 row mx-auto justify-content-evenly'>
          <div className='products-groupby-section p-3 col-md-2'>
            <h4>دسته بندی:</h4>
            <div className='groupby-sex-btns mt-4'>
              <form>
                <input type="radio" id='men' value="men's clothing" name='groupby' onChange={(event) => setGroupByHandler(event)} />
                <label htmlFor="men" className='men-label'>پوشاک آقایان</label><br />
                <input type="radio" id='women' value="women's clothing" name='groupby' onChange={(event) => setGroupByHandler(event)} />
                <label htmlFor="women" className='women-label'>پوشاک بانوان</label><br />
                <input type="radio" id='jewelery' value="jewelery" name='groupby' onChange={(event) => setGroupByHandler(event)} />
                <label htmlFor="jewelery" className='jewelery-label'>جواهرات</label><br />
                <input type="radio" id='electronics' value="electronics" name='groupby' onChange={(event) => setGroupByHandler(event)} />
                <label htmlFor="electronics" className='electronics-label'>لوازم الکترونیکی</label>
              </form>
            </div>
          </div>
          <div className='products-container col-md-9 p-3'>
            <div className='products-sortby-section d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items-center w-75'>
                <span>مرتب سازی بر اساس:</span>
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
              {isLoading ? (
                Array.from({ length: pageSize }).map((_, index) => (
                  <div className='col-sm-6 col-md-4' key={index}>
                    <div className='product-card mb-5'>
                      <div className='product-img w-50 mx-auto'>
                        <SkeletonTheme baseColor="#EEE" highlightColor="#242424" borderRadius="0.5rem">
                          <Skeleton width={200} height={200} />
                        </SkeletonTheme>
                      </div>
                      <hr />
                      <SkeletonTheme baseColor="#EEE" highlightColor="#242424">
                        <Skeleton count={2}/>
                      </SkeletonTheme>
                      <Link to="product/2" className='product-link p-2 rounded my-3'>
                        <SkeletonTheme baseColor="#EEE" highlightColor="#242424">
                          <Skeleton width={100} />
                        </SkeletonTheme>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                paginatedProducts.map((product) => (
                  <div className='col-sm-6 col-md-4' key={product.id}>
                    <ProductCard {...product}/>
                  </div>
                ))
              )}
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
    </div>
  )
}
