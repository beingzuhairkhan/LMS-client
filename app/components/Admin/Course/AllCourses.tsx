import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FiEdit2 } from "react-icons/fi";
import { useGetAllCoursesQuery, useDeleteCourseMutation } from '../../../../redux/features/courses/coursesAPI'
import Loader from '../../../components/Loader/Loader'
import { format } from 'timeago.js'
import { style } from '../../../styles/style'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
type Props = {};

const AllCourses = (props: Props) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false)
  const [courseId, setCourseId] = useState('')
  const { isLoading, data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true })
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({})

  useEffect(() => {

    if (isSuccess) {
      refetch();
      toast.success("course Deleted Successfully");
      setOpen(false);
    }
    if (error) {
      toast.error("User delete Failed");
    }

  }, [isSuccess, error]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "  ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Link href={`/admin/edit-course/${params.row.id}`}>
              <FiEdit2
                className="dark:text-white text-black"
                size={20}
              />
            </Link>
          </>
        )
      },
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setCourseId(params.row.id)
              }}
            >
              <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </>
        )
      },
    },
  ];
  const rows: any = [];
  {
    data && data.course.forEach((item: any) => {
      rows.push({
        id: item._id,
        title: item.name,
        purchased: item.purchase,
        ratings: item.ratings,
        created_at: format(item.createdAt),
      })
    })
  }

  const handleDelete = async () => {
    const id = courseId
    await deleteCourse(id)
    setOpen(false)
  }




  return (
    <div className="mt-[120px]">
      {
        isLoading ? (
          <Loader />
        ) : (
          <Box m="20px">
            <Box m="40px 0 0 0" height="80vh" sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom: theme === "dark" ? "1px solid #ffffff30 !important" : "1px solid #ccc !important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column-cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiDataGrid-virtualScroller": {

                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F6F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === 'dark' ? "#3e4396" : "#A4A9FC"
              },
              "& .MuiCheckbox-root": {
                color: theme === 'dark' ? "#b7ebde !important" : "#000 !important"
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#fff !important`
              }
            }}>
              <DataGrid checkboxSelection rows={rows} columns={columns} />
            </Box>
            {
              open && (

                <Modal
                  open={open}
                  onClose={() => setOpen(!open)}
                  aria-labelledby='modal-modal-title'
                  aria-describedby='modal-modal-description'
                >
                  <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[80px] shadow p-4 outline-none">
                    <h1 className={`${style.title}`}>Are you want to delete this course</h1>
                    <div className="flex w-full items-center justify-between mb-6 mt-4">
                      <div className={`${style.button} !w-[120px] h-[30px] bg-[#57c7a3]`} onClick={() => setOpen(!open)}>
                        Cancel
                      </div>
                      <div className={`${style.button} !w-[120px] h-[30px] bg-red`} onClick={handleDelete}>
                        Delete
                      </div>
                    </div>
                  </Box>
                </Modal>


              )
            }
          </Box>
        )
      }
    </div>
  );
};

export default AllCourses;
