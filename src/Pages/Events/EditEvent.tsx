import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { updateEvent } from "../../Features/eventSlice";
import { Event } from "../../types/eventTypes";
import { AppDispatch } from "../../Store/store";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

type FormData = {
  name: string;
  date: Date | string;
  location: string;
  description: string;
  roles: { role: string; volunteersRequired: string | number }[];
};

function MyVerticallyCenteredModal({
  show,
  onHide,
  oldEvent,
}: {
  show: boolean;
  onHide: () => void;
  oldEvent: Event;
}) {
  const dispatch = useDispatch<AppDispatch>();

  // for react hook form
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      roles:
        oldEvent.roles?.length > 0
          ? oldEvent.roles
          : [
              {
                role: "",
                volunteersRequired: "",
              },
            ],
      name: oldEvent?.name,
      date: oldEvent?.date?.slice(0, 10),
      location: oldEvent?.location,
      description: oldEvent?.description,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "roles",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("event updated:", data);
    dispatch(
      updateEvent({ id: oldEvent?._id as string, newEvent: data as Event })
    );
    onHide();
    reset();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Body>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex w-100 m-auto flex-column justify-content-center align-items-center gap-2"
        >
          <div className="d-flex flex-column w-100">
            <label htmlFor="name">Name: </label>
            {/* <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={event.name as string}
              onChange={(e) => handleChange(e)}
              required
            /> */}

            <input
              id="name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="date">Date: </label>
            <input
              type="date"
              id="date"
              {...register("date", { required: "Date is required" })}
            />
            {errors.date && (
              <p className="text-danger">{errors.date.message}</p>
            )}
            {/* <input
              type="date"
              id="date"
              name="date"
              placeholder="Date"
              value={event.date}
              onChange={(e) => handleChange(e)}
              required
            /> */}
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="location">Location: </label>
            <input
              id="location"
              {...register("location", { required: "Location is required" })}
            />
            {errors.location && (
              <p className="text-danger">{errors.location.message}</p>
            )}
            {/* <input
              type="text"
              id="location"
              name="location"
              placeholder="Location"
              value={event.location as string}
              onChange={(e) => handleChange(e)}
              required
            /> */}
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="description">Description: </label>
            <input
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-danger">{errors.description.message}</p>
            )}
            {/* <input
              type="text"
              id="description"
              name="description"
              placeholder="Description"
              value={event.description as string}
              onChange={(e) => handleChange(e)}
              required
            /> */}
          </div>
          <div className="d-flex flex-column w-100">
            <label htmlFor="volunteerRoles">Volunteer Roles:</label>
            {fields.map((field, index) => (
              <div className="d-flex gap-2 mb-2" key={field.id}>
                <div className="w-50">
                  <input
                    className="w-100"
                    type="text"
                    placeholder="Role"
                    {...register(`roles.${index}.role`, {
                      required: "Role is required",
                    })}
                  />
                  {errors.roles?.[index]?.role && (
                    <span className="text-danger">
                      {errors.roles[index].role.message}
                    </span>
                  )}
                </div>
                <div className="w-50">
                  <input
                    className="w-100"
                    type="number"
                    min={1}
                    placeholder="Volunteers required"
                    {...register(`roles.${index}.volunteersRequired`, {
                      required: "Volunteers is required",
                      valueAsNumber: true,
                    })}
                  />
                  {errors.roles?.[index]?.volunteersRequired && (
                    <span className="text-danger">
                      {errors.roles[index].volunteersRequired.message}
                    </span>
                  )}
                </div>
                {fields.length > 1 && (
                  <button
                    className="btn btn-dark"
                    style={{ width: "max-content", height: "max-content" }}
                    type="button"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {/* {event?.roles?.map((role, index) => (
              <div className="d-flex gap-2 mb-2" key={index}>
                <input
                  className="w-100"
                  type="text"
                  placeholder="Role"
                  value={role.role as string}
                  onChange={(e) => handleRole(e.target.value, index)}
                  required
                />
                <input
                  className="w-100"
                  type="number"
                  min={1}
                  placeholder="volunteers required"
                  value={role.volunteersRequired as string}
                  onChange={(e) =>
                    handleVolunteersRequired(e.target.value, index)
                  }
                  required
                />
                {event.roles.length > 1 && (
                  <button
                    className="btn btn-dark"
                    style={{ width: "max-content" }}
                    onClick={(e) => {
                      e.preventDefault();
                      setEvent((prev) => ({
                        ...prev,
                        roles: prev.roles.filter((r) => r?._id !== role?._id),
                      }));
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))} */}
            {/* <button
              className="btn btn-dark mt-1"
              style={{ width: "max-content" }}
              onClick={(e) => {
                e.preventDefault();
                setEvent((prev) => ({
                  ...prev,
                  roles: [...prev.roles, { role: "", volunteersRequired: "" }],
                }));
              }}
            >
              Add Role
            </button> */}

            <button
              className="btn btn-dark mt-1"
              style={{ width: "max-content" }}
              type="button"
              onClick={() => append({ role: "", volunteersRequired: "" })}
            >
              Add Role
            </button>
          </div>

          <button className="btn btn-dark mt-2">Edit Event</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

const EditEvent = ({ event }: { event: Event }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setModalShow(true);
        }}
        className="custom-btn"
      >
        Edit
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        oldEvent={event}
      />
    </>
  );
};

export default EditEvent;
