import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   useTable,
//   useGlobalFilter,
//   useSortBy,
//   usePagination,
// } from "react-table";

import SkeletonTable from "../../Templates/SkeletonTable";
import { fetchVolunteers } from "../../Features/volunteerSlice";
import { fetchEvents } from "../../Features/eventSlice";
import AddVolunteer from "./AddVolunteer";
import ReactTable from "../../Templates/Table";
import VolunteerDetails from "./VolunteerDetails";
import EditVolunteer from "./EditVolunteer";
import DeleteVolunteer from "./DeleteVolunteer";
import { useAppSelector } from "../../hooks/useAppSelector";
import { AppDispatch } from "../../Store/store";
import { createColumnHelper } from "@tanstack/react-table";
import { Volunteer } from "../../types/volunteerTypes";
import TanstackTable from "../../Templates/TanstackTable";
import EventDetails from "../Events/EventDetails";
import EditEvent from "../Events/EditEvent";
import DeleteEvent from "../Events/DeleteEvent";

const Volunteers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, volunteers } = useAppSelector((state) => state?.volunteers);
  const { events } = useAppSelector((state) => state?.events);

  useEffect(() => {
    dispatch(fetchVolunteers());
    dispatch(fetchEvents());
  }, []);

  // const tableColumns = [
  //   {
  //     Header: "Sr no.",
  //     Cell: ({ row }) => row.index + 1,
  //   },
  //   {
  //     Header: "Name",
  //     accessor: "name",
  //   },
  //   {
  //     Header: "Contact",
  //     accessor: "contact",
  //   },
  //   {
  //     Header: "Availability",
  //     accessor: "availability",
  //   },
  // {
  //   Header: "Roles",
  //   accessor: "roles",
  //   Cell: ({ row }) => (
  //     <div className="mt-1 d-flex flex-wrap gap-2 justify-content-start align-items-start">
  //       {row.original.roles?.map((role) => (
  //         <p className="m-0 role badge" key={role}>
  //           {role}
  //         </p>
  //       ))}
  //     </div>
  //   ),
  // },
  //   {
  //     Header: "Skills",
  //     accessor: "skills",
  //     Cell: ({ row }) => (
  //       <div className="mt-1 d-flex flex-wrap gap-2 justify-content-start align-items-start">
  //         {row.original.skills?.map((skill) => (
  //           <p className="m-0 role badge" key={skill}>
  //             {skill}
  //           </p>
  //         ))}
  //       </div>
  //     ),
  //   },
  //   {
  //     Header: "Interests",
  //     accessor: "interests",
  //     Cell: ({ row }) => (
  //       <div className="mt-1 d-flex flex-wrap gap-2 justify-content-start align-items-start">
  //         {row.original.interests?.map((interest) => (
  //           <p className="m-0 role badge" key={interest}>
  //             {interest}
  //           </p>
  //         ))}
  //       </div>
  //     ),
  //   },
  // {
  //   Header: "Actions",
  //   accessor: "actions",
  //   Cell: ({ row }) => (
  //     <div className="d-flex justify-content-center gap-2">
  //       <VolunteerDetails volunteer={row.original} />
  //       <EditVolunteer volunteer={row.original} />
  //       <DeleteVolunteer volunteer={row.original} />
  //     </div>
  //   ),
  // },
  // ];

  // const columns2 = useMemo(() => tableColumns, []);
  const data = useMemo(() => {
    console.log("volunteers: ", volunteers);
    return volunteers;
  }, [volunteers]);

  // const tableInstance = useTable(
  //   {
  //     columns,
  //     data,
  //   },
  //   useGlobalFilter,
  //   useSortBy,
  //   usePagination
  // );

  const columnHeaders = [
    "Sr no",
    "Name",
    "Contact",
    "Availability",
    "Roles",
    "Skills",
    "Interests",
    "Actions",
  ];

  const columnHelper = createColumnHelper<Volunteer>();

  const columns = [
    columnHelper.accessor("_id", {
      cell: (info) => {
        return info.row.index + 1;
      },
      header: () => <span>Sr no</span>,
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: () => <span>Volunteer Name</span>,
    }),
    columnHelper.accessor("contact", {
      cell: (info) => info.getValue(),
      header: () => <span>Contact</span>,
    }),
    columnHelper.accessor("availability", {
      header: () => "Availability",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("roles", {
      header: "Roles",
      cell: ({ row }) => (
        <div className="mt-1 d-flex flex-wrap gap-2 justify-content-start align-items-start">
          {row.original.roles?.map((role) => (
            <p className="m-0 role badge" key={`${role}`}>
              {role}
            </p>
          ))}
        </div>
      ),
    }),
    columnHelper.accessor("skills", {
      header: "Skills",
      cell: ({ row }) => (
        <div className="mt-1 d-flex flex-wrap gap-2 justify-content-start align-items-start">
          {row.original.skills?.map((skill) => (
            <p className="m-0 role badge" key={`${skill}`}>
              {skill}
            </p>
          ))}
        </div>
      ),
    }),
    columnHelper.accessor("interests", {
      header: "Interests",
      cell: ({ row }) => (
        <div className="mt-1 d-flex flex-wrap gap-2 justify-content-start align-items-start">
          {row.original.interests?.map((interest) => (
            <p className="m-0 role badge" key={`${interest}`}>
              {interest}
            </p>
          ))}
        </div>
      ),
    }),
    columnHelper.accessor("actions", {
      cell: ({ row }) => (
        <div className="d-flex justify-content-center gap-2">
          <VolunteerDetails volunteer={row.original} />
          <EditVolunteer volunteer={row.original} />
          <DeleteVolunteer volunteer={row.original} />
        </div>
      ),
      header: () => <span>Actions</span>,
    }),
  ];

  return (
    <div>
      <h4>Volunteers</h4>
      <div className="d-flex justify-content-start">
        <AddVolunteer events={events} />
      </div>
      <div className="w-100 mt-3">
        {loading ? (
          <SkeletonTable columnHeaders={columnHeaders} />
        ) : volunteers?.length > 0 ? (
          <>
            {/* <ReactTable tableInstance={tableInstance} /> */}
            <TanstackTable data={data} columns={columns} />
          </>
        ) : (
          <p className="mt-4 fs-5 text-start">No Volunteers found!</p>
        )}
      </div>
    </div>
  );
};

export default Volunteers;
