import { useParams } from "react-router";
import { data } from "../db";
import { useContext, useState } from "react";
import { MeetUpContext } from "../context/meetupContext";
export const Event = () => {
  const { state, dispatch, modal, setModal } = useContext(MeetUpContext);
  const { eventId } = useParams();

  const event = state.data.find((item) => item.id === eventId);
  console.log(event);
  const { id, isPaid, title, eventType, paid, price } = event;

  return (
    <div>
      <h2>{title}</h2>
      <p>{eventType}</p>
      <p>{price}</p>
      {!paid ? (
        <button
          className="border-solid border-black"
          onClick={() => setModal(true)}
        >
          RSVP
        </button>
      ) : (
        <p>"Already RSVP"</p>
      )}
      {modal && <Modal isPaid={isPaid} id={id} />}
    </div>
  );
};

export const Modal = ({ isPaid, id }) => {
  const { dispatch, setModal } = useContext(MeetUpContext);
  return (
    <div>
      Name:
      <input />
      Mail:
      <input />
      <button
        onClick={() => {
          dispatch({ type: "submit", payload: id });
          setModal(false);
        }}
      >
        Submit
      </button>
      {isPaid && <p>"You have to make the payment at the venue"</p>}
    </div>
  );
};
