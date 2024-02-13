import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";

import SkeletonTable from "../../Templates/SkeletonTable";
import { fetchVolunteers } from "../../Features/volunteerSlice";
import AddVolunteer from "./AddVolunteer";
import ReactTable from "../../Templates/Table";
import VolunteerDetails from "./VolunteerDetails";
import EditVolunteer from "./EditVolunteer";
import DeleteVolunteer from "./DeleteVolunteer";

const Volunteers = () => {
  const dispatch = useDispatch();
  const { loading, volunteers } = useSelector((state) => state?.volunteers);

  useEffect(() => {
    dispatch(fetchVolunteers());
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
          <VolunteerDetails volunteer={row.original} />
          <EditVolunteer volunteer={row.original} />
          <DeleteVolunteer volunteer={row.original} />
        </div>
      ),
    },
  ];

  const columns = useMemo(() => tableColumns, []);
  const data = useMemo(() => volunteers, [volunteers]);

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
      <h4>Volunteers</h4>
      <div className="d-flex justify-content-start">
        <AddVolunteer />
      </div>
      <div className="w-100 mt-3">
        {loading ? (
          <SkeletonTable columnHeaders={columnHeaders} />
        ) : volunteers?.length > 0 ? (
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

export default Volunteers;
