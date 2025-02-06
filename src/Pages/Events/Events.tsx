import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   useTable,
//   useGlobalFilter,
//   useSortBy,
//   usePagination,
// } from "react-table";

import SkeletonTable from "../../Templates/SkeletonTable";
import { fetchEvents } from "../../Features/eventSlice";
import { fetchVolunteers } from "../../Features/volunteerSlice";
import AddEvent from "./AddEvent";
import EventDetails from "./EventDetails";
import EditEvent from "./EditEvent";
import DeleteEvent from "./DeleteEvent";
import { formatDate } from "../../../utils/utilityFunctions";
import TanstackTable from "../../Templates/TanstackTable";

import { createColumnHelper } from "@tanstack/react-table";
import { AppDispatch } from "../../Store/store";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Event } from "../../types/eventTypes";

const Events = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, events } = useAppSelector((state) => state?.events);

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchVolunteers());
  }, []);

  const columnHeaders = [
    "Sr no",
    "Name",
    "Date",
    "Location",
    "Volunteers Required",
    "Actions",
  ];

  // const tableColumns = [
  //   {
  //     Header: "Sr no.",
  //     accessor: "job_id",
  //     Cell: ({ row }) => row.index + 1,
  //   },
  //   {
  //     Header: "Name",
  //     accessor: "name",
  //   },
  //   {
  //     Header: "Date",
  //     accessor: "date",
  //     Cell: ({ row }) => formatDate(row.original.date?.slice(0, 10)),
  //   },
  //   {
  //     Header: "Location",
  //     accessor: "location",
  //   },
  //   {
  //     Header: "Volunteers required",
  //     Cell: ({ row }) =>
  //       row.original.roles.reduce(
  //         (acc, { volunteersRequired }) => (acc += +volunteersRequired),
  //         0
  //       ),
  //   },
  //   {
  //     Header: "Actions",
  //     accessor: "actions",
  //     Cell: ({ row }) => (
  //       <div className="d-flex justify-content-center gap-2">
  //         <EventDetails event={row.original} />
  //         <EditEvent event={row.original} />
  //         <DeleteEvent event={row.original} />
  //       </div>
  //     ),
  //   },
  // ];

  // const columns2 = useMemo(() => tableColumns, []);

  const data = useMemo(() => {
    console.log("events: ", events);
    return events;
  }, [events]);

  // const tableInstance = useTable(
  //   {
  //     columns: columns2,
  //     data,
  //   },
  //   useGlobalFilter,
  //   useSortBy,
  //   usePagination
  // );

  const columnHelper = createColumnHelper<Event>();

  const columns = [
    columnHelper.accessor("_id", {
      cell: (info) => {
        console.log("info: ", info);
        return info.row.index + 1;
      },
      header: () => <span>Sr no</span>,
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: () => <span>Event Name</span>,
    }),
    columnHelper.accessor("date", {
      cell: ({ row }) => formatDate(row.original.date?.slice(0, 10)),
      header: () => <span>Date</span>,
    }),
    columnHelper.accessor("location", {
      header: () => "Location",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("volunteersRequired", {
      header: "Volunteers required",
      cell: (info) => {
        const total = info.row.original.roles.reduce(
          (acc, { volunteersRequired }) => (acc += +volunteersRequired),
          0
        );
        return total;
      },
    }),
    columnHelper.accessor("actions", {
      cell: ({ row }) => (
        <div className="d-flex justify-content-center gap-2">
          <EventDetails event={row.original} />
          <EditEvent event={row.original} />
          <DeleteEvent event={row.original} />
        </div>
      ),
      header: () => <span>Actions</span>,
    }),
  ];

  return (
    <div>
      <h4>Events</h4>
      <div className="d-flex justify-content-start">
        <AddEvent />
      </div>
      <div className="w-100 mt-3">
        {loading ? (
          <SkeletonTable columnHeaders={columnHeaders} />
        ) : events?.length > 0 ? (
          <>
            <TanstackTable data={data} columns={columns} />
          </>
        ) : (
          <p className="mt-4 fs-5 text-start">No Events found!</p>
        )}
      </div>
    </div>
  );
};

export default Events;
