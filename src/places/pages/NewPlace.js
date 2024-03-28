import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./PlaceForm.css";

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      userProfileUrl: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("userProfileUrl", formState.inputs.userProfileUrl.value);
      console.log("runn salkdfjlsdjf l"+formData);
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places`, "POST", formData, {
        Authorization: "Bearer " + auth.token,
      });
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="userProfileUrl"
          element="text"
          label="Url"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a Url."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD URL
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
