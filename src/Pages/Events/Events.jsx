import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";

import SkeletonTable from "../../Templates/SkeletonTable";
import { fetchEvents } from "../../Features/eventSlice";
import AddEvent from "./AddEvent";
import ReactTable from "../../Templates/Table";
import EventDetails from "./EventDetails";
import EditEvent from "./EditEvent";
import DeleteEvent from "./DeleteEvent";

const Events = () => {
  const dispatch = useDispatch();
  const { loading, events } = useSelector((state) => state?.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  const tableColumns = [
    {
      Header: "Sr no.",
      accessor: "job_id",
      Cell: ({ row }) => row.index + 1,
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Location",
      accessor: "location",
    },
    {
      Header: "Volunteers required",
      accessor: "volunteersNumber",
    },
    {
      Header: "Volunteer Roles",
      accessor: "volunteerRoles",
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <div className="d-flex justify-content-center gap-2">
          <EventDetails event={row.original} />
          <EditEvent event={row.original} />
          <DeleteEvent event={row.original} />
        </div>
      ),
    },
  ];

  const columns = useMemo(() => tableColumns, []);
  const data = useMemo(() => events, [events]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const columnHeaders = [
    "Sr no",
    "Name",
    "Age",
    "Gender",
    "Medical History",
    "Assigned Ward",
    "Actions",
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
            <ReactTable tableInstance={tableInstance} />
          </>
        ) : (
          <p className="mt-4 fs-5 text-start">No data found!</p>
        )}
      </div>
    </div>
  );
};

export default Events;
