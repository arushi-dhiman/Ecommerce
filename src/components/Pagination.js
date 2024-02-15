import ReactPaginate from 'react-paginate'
import './styles/adminDashboard.css'


const Pagination = ({ paginatedData, totalRecords, totalNumOfPages, currentProducts }) => {

  const handlePageClick = (data) => {
    debugger
    console.log(data.selected)
    let currentPage = data.selected + 1;
    paginatedData(currentPage)
    }
  



  return (
    <div className='clearfix'>
      <div className='hint-text'>Showing <b>{currentProducts}</b> out of <b>{totalRecords}</b> Products</div>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={totalNumOfPages}
        marginPagesDisplayed={2}
        initialPage={0}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
      />
    </div>
  )
}

export default Pagination
