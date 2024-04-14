import React, { useState } from "react";
import AdminNav from "../../Components/Admin/AdminNav";
import { Card, Typography } from "@material-tailwind/react";
import ReactPaginate from "react-paginate";

function AdminUser() {
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 5; // Number of items per page
  
    const TABLE_HEAD = ["Name", "Job", "Employed", ""];
    const TABLE_ROWS = [
      {
        name: "John Michael",
        job: "Manager",
        date: "23/04/18",
      },
      {
        name: "Alexa Liras",
        job: "Developer",
        date: "23/04/18",
      },
      {
        name: "Laurent Perrier",
        job: "Executive",
        date: "19/09/17",
      },
      {
        name: "Michael Levi",
        job: "Developer",
        date: "24/12/08",
      },
      {
        name: "Richard Gran",
        job: "Manager",
        date: "04/10/21",
      },
      {
        name: "rqwerqw wrqwerqwer",
        job: "Manager",
        date: "23/04/18",
      },
      {
        name: "qreqwerqwr Liras",
        job: "Developer",
        date: "23/04/18",
      },
      {
        name: "dfgwefgqetgqetg Perrier",
        job: "Executive",
        date: "19/09/17",
      },
      {
        name: "fqrgqegqerg Levi",
        job: "Developer",
        date: "24/12/08",
      },
      {
        name: "Richard Gran",
        job: "Manager",
        date: "04/10/21",
      },
    ];
  
    const offset = currentPage * pageSize;
    const pageCount = Math.ceil(TABLE_ROWS.length / pageSize);
    const currentPageData = TABLE_ROWS.slice(offset, offset + pageSize);
  
    const handlePageChange = ({ selected }) => {
      setCurrentPage(selected);
    };


  return (
    <div className="flex">
      <div className="border">
        <AdminNav />
      </div>
      <div className="w-screen h-screen m-1 border">
        <Card className="h-full w-full overflow-scroll">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentPageData.map(({ name, job, date }, index) => {
                const isLast =
                  index === currentPageData.length - 1 &&
                  currentPage === pageCount - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name} className={classes}>
                    <td>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {job}
                      </Typography>
                    </td>
                    <td>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td>
                    <td>
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        Edit
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName={"pagination flex justify-center"}
            previousLinkClassName={"pagination__link border border-blue-gray-200 rounded-full p-2 mr-2"}
            nextLinkClassName={"pagination__link border border-blue-gray-200 rounded-full p-2 ml-2"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active bg-blue-gray-200 text-blue-600"}
          />
        </Card>
      </div>
    </div>
  )
}

export default AdminUser
