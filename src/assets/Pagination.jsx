import React from 'react'

function Pagination({ postPerPage, totalPage, paginate, current }) {
    let pageNumber = [];

    for (let i = 1; i <= Math.ceil(totalPage / postPerPage); i++) {
        pageNumber.push(i)
    }
    console.log("pagenumber", current, "pagenumber", postPerPage, "pagenumber", totalPage, "pagenumber", current)

    const handleNext = () => {

    }
    return (
        <div>
            <nav>
                <ul className='pagination'>

                    <li><a onClick={() => { paginate(current - 1) }} className='page-link'>prev</a></li>
                    <li><a onClick={() => { paginate(current + 1) }} className='page-link'>next</a></li>

                  
                </ul>
            </nav>
        </div>
    )
}
export default Pagination