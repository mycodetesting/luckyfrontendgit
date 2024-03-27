import React, { useContext } from "react";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import "./PlaceList.css";

const PlaceList = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  console.log(props.items);
  if (!props.items || props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No URL found. Maybe create one?</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="top_place-list_InstagramtoInstagram">
        <ul className="place-list_InstagramtoInstagram">
          {!isLoading &&
            props.items.map((place) => (
              <PlaceItem
                key={place.id}
                id={place.id}
                title={place.userProfileUrl}
                creatorId={place.creator}
                onDelete={props.onDeletePlace}
                auth={auth}
              />
            ))}
        </ul>
      </div>
    </>
  );
};

export default PlaceList;
