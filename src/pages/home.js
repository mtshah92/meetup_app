import { useState } from "react";
import { data } from "../db";
import { useNavigate } from "react-router";

export const Home = () => {
  const [filter, setFilter] = useState({ search: "", type: "" });
  const navigate = useNavigate();

  const resp = () => {
    let info = data.meetups;

    if (filter.search == "" && filter.type == "") {
      return (info = data.meetups);
    }
    if (filter.search) {
      return (info = data.meetups.filter(
        (item) =>
          item.title.toLowerCase().includes(filter.search.toLowerCase()) ||
          item.eventTags.join().includes(filter.search.toLowerCase())
      ));
    }
    if (filter.type) {
      if (filter.type === "both") {
        return (info = data.meetups);
      } else {
        return (info = data.meetups.filter(
          (item) => item.eventType === filter.type
        ));
      }
    }
    return info;
  };
  const filterData = resp();
  console.log(filterData);
  return (
    <div>
      <div className="flex flex-row justify-around content-center">
        <h2>MeetUp</h2>
        <div>
          <input
            placeholder="Search By Title and Tags..."
            type="text"
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
        </div>
      </div>
      <hr />
      <div className="main-page">
        <div className="main-head flex justify-between">
          <h2>MeetUp Events</h2>
          <div>
            <select
              name="event-type"
              onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            >
              <option selected disabled>
                Select Event Type
              </option>
              <option value="Online">Online</option>
              <option value="Offline">Offine</option>
              <option value="both">Both</option>
            </select>
          </div>
        </div>
        <div className="main-content">
          {filterData.map(
            ({ id, title, eventType, eventStartTime, eventThumbnail }) => (
              <div
                className="event"
                key={id}
                onClick={() => navigate(`/event/${id}`)}
              >
                <img
                  src={eventThumbnail}
                  alt={title}
                  className="w-100px h-100px"
                />
                <p>{title}</p>
                <p>{eventType}</p>
                <p>{eventStartTime}</p>
              </div>
            )
          )}
        </div>
      </div>
      {}
    </div>
  );
};
