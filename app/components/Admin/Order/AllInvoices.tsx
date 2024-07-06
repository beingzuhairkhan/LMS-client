import React, { FC, useState, useEffect } from 'react';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useGetAllCoursesQuery } from "../../../../redux/features/courses/coursesAPI";
import { useGetAllUsersQuery } from "../../../../redux/features/user/userApi";
import { useGetAllOrdersQuery } from "../../../../redux/features/Orders/orderApi";
import Loader from '../../Loader/Loader';
import { format } from 'timeago.js';
import { AiOutlineMail } from "react-icons/ai";

type Props = {
    isDashboard?: boolean;
}

const AllInvoices: FC<Props> = ({ isDashboard }) => {
    const { isLoading: ordersLoading, data: ordersData } = useGetAllOrdersQuery({});
    const { data: usersData } = useGetAllUsersQuery({});
    const { data: coursesData } = useGetAllCoursesQuery({});
    const [orderData, setOrderData] = useState<any[]>([]);

    useEffect(() => {
        if (ordersData && usersData && coursesData) {
            const temp = ordersData.orders?.map((item: any) => {
                const user = usersData.users.find(
                    (user: any) => user._id === item.userId
                );
                const course = coursesData.courses.find(
                    (course: any) => course._id === item.courseId
                );

                return {
                    id: item._id, // Make sure to provide a unique id for each row
                    userName: user?.name || '',
                    userEmail: user?.email || '',
                    title: course?.name || '',
                    price: `$${course?.price}`,
                    created_at: format(item.createdAt)
                };
            });
            setOrderData(temp || []);
        }
    }, [ordersData, usersData, coursesData]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.3 },
        { field: 'userName', headerName: 'Name', flex: isDashboard ? 0.6 : 0.5 },
        ...(isDashboard ? [] : [
            { field: 'userEmail', headerName: 'Email', flex: 1 },
            { field: 'title', headerName: 'Course Title', flex: 1 },
        ]),
        { field: 'price', headerName: 'Price', flex: 0.5 },
        ...(isDashboard ? [
            { field: 'created_at', headerName: 'Created At', flex: 0.5 },
        ] : [
            {
                field: "emailLink", headerName: "Email", flex: 0.2, renderCell: (params: any) => {
                    return (
                        <a href={`mailto:${params.row.userEmail}`}>
                            <AiOutlineMail className="dark:text-white text-black" size={20} />
                        </a>
                    );
                }
            }
        ])
    ];

    if (ordersLoading) {
        return <Loader />;
    }

    return (
        <Box m={isDashboard ? "0" : '40px'}>
            <Box m={isDashboard ? '0' : '40px 0 0 0'} overflow="hidden" height={isDashboard ? "35vh" : "90vh"}
                sx={{
                    '& .MuiDataGrid-root': { border: 'none', outline: 'none' },
                    '& .MuiSvgIcon-root-MuiSelect-icon': { color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000' },
                    '& .MuiDataGrid-sortIcon': { color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000' },
                    '& .MuiDataGrid-row': { color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000', borderBottom: (theme) => theme.palette.mode === 'dark' ? '1px solid #ffffff30!important' : '1px solid #ccc!important' },
                    '& .MuiTablePagination-root': { color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000' },
                    '& .MuiDataGrid-cell': { borderBottom: 'none!important' },
                    '& .name-column-cell': { color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000' },
                    '& .MuiDataGrid-columnHeaders': { backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#3e4396' : '#A4A9FC', borderBottom: 'none', color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000' },
                    '& .MuiDataGrid-virtualScroller': { backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1F2A40' : '#F2F0F0' },
                    '& .MuiDataGrid-footerContainer': { color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000', borderTop: 'none' },
                    '& .MuiCheckbox-root': { color: (theme) => theme.palette.mode === 'dark' ? '#b7ebde !important' : '#000 !important' },
                    '& .MuiDataGrid-toolbarContainer .MuiButton-text': { color: '#fff !important' },
                }}>
                <DataGrid
                    rows={orderData}
                    columns={columns}
                    checkboxSelection={!isDashboard}
                />
            </Box>
        </Box>
    );
};

export default AllInvoices;
