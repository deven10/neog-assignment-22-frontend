import Modal from "react-bootstrap/Modal";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addEvent } from "../../Features/eventSlice";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../Store/store";

import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

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
}: {
  show: boolean;
  onHide: () => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [event, setEvent] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
    roles: [
      {
        role: "",
        volunteersRequired: "",
      },
    ],
  });

  const handleRole = (value: string, index: number) => {
    const updatedRoles = event.roles.map((role, i) =>
      i === index
        ? { role: value, volunteersRequired: role.volunteersRequired }
        : role
    );
    setEvent((prev) => ({
      ...prev,
      roles: updatedRoles,
    }));
  };

  const handleVolunteersRequired = (value: string, index: number) => {
    const updatedVolunteersRequired = event.roles.map((singleRole, i) =>
      i === index
        ? { role: singleRole.role, volunteersRequired: value }
        : singleRole
    );
    setEvent((prev) => ({
      ...prev,
      roles: updatedVolunteersRequired,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOld = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, date, location, description, roles } = event;

    const bool =
      [name, date, location, description].every((a) => Boolean(a.trim())) &&
      roles.every(
        ({ role, volunteersRequired }) =>
          Boolean(role.trim()) && Boolean(volunteersRequired.toString())
      );

    if (bool) {
      dispatch(addEvent(event));
      onHide();
      setEvent({
        name: "",
        date: "",
        location: "",
        description: "",
        roles: [
          {
            role: "",
            volunteersRequired: "",
          },
        ],
      });
    } else {
      const validateEvent = () => {
        if (
          !roles.every(
            ({ role, volunteersRequired }) => role.trim() && volunteersRequired
          )
        ) {
          return "Please enter role & required volunteers, or remove the role";
        }
        if (!description.trim()) {
          return "Please enter event description";
        }
        if (!location.trim()) {
          return "Please enter event location";
        }
        if (!date.trim()) {
          return "Please enter event date";
        }
        if (!name.trim()) {
          return "Please enter event name";
        }
        return null;
      };

      const validationError = validateEvent();
      if (validationError) {
        toast.error(validationError);
      }
    }
  };

  // for react hook form
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    defaultValues: {
      roles: [{ role: "", volunteersRequired: "" }],
    },
  });

  useEffect(() => {
    console.log("errors: ", errors);
  }, [errors]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "roles",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form Submitted:", data);

    dispatch(addEvent(data));
    onHide();
  };

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex w-100 m-auto flex-column justify-content-center align-items-center gap-2"
          >
            {/* NAME */}
            <div className="d-flex flex-column w-100">
              <label htmlFor="name">Name: </label>
              <input
                id="name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-danger">{errors.name.message}</p>
              )}
            </div>
            {/* DATE */}
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
            </div>
            {/* LOCATION */}
            <div className="d-flex flex-column w-100">
              <label htmlFor="location">Location: </label>
              <input
                id="location"
                {...register("location", { required: "Location is required" })}
              />
              {errors.location && (
                <p className="text-danger">{errors.location.message}</p>
              )}
            </div>
            {/* DESCRIPTION */}
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
            </div>
            {/* VOLUNTEER ROLES */}
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

              <button
                className="btn btn-dark mt-1"
                style={{ width: "max-content" }}
                type="button"
                onClick={() => append({ role: "", volunteersRequired: "" })}
              >
                Add Role
              </button>
            </div>

            <button className="btn btn-dark mt-2" type="submit">
              Add New Event
            </button>
          </form>
        </Modal.Body>
      </Modal>
      <DevTool control={control} />
    </>
  );
}

const AddEvent = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button onClick={() => setModalShow(true)} className="custom-btn">
        Add New Event
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default AddEvent;
