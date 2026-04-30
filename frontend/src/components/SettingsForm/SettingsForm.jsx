import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import userUpdate from "../../services/userUpdate";
import FormFieldset from "../FormFieldset";
import FormTextArea from "../FormTextArea/FormTextArea";
import FormButton from "../FormButton/FormButton";

function SettingsForm() {
  const { headers, isAuth, loggedUser, setAuthState } = useAuth();
  const [{ bio, email, image, password, username }, setForm] = useState({
    bio: loggedUser.bio || "",
    email: loggedUser.email,
    image: loggedUser.image || "",
    password: loggedUser.password || "",
    username: loggedUser.username,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate("/");
  }, [isAuth, loggedUser, navigate]);

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((form) => ({ ...form, [name]: value }));
    setSuccessMessage("");
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    if (isSaving) return;

    setIsSaving(true);
    setSuccessMessage("");

    try {
      const updatedAuthState = await userUpdate({
        headers,
        bio,
        email,
        image,
        password,
        username,
      });

      if (!updatedAuthState) return;

      setAuthState(updatedAuthState);
      setSuccessMessage("Your settings have been updated.");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    isAuth && (
      <form onSubmit={formSubmit}>
        <fieldset>
          <FormFieldset
            placeholder="URL of profile picture"
            name="image"
            value={image}
            handler={inputHandler}
          ></FormFieldset>

          <FormFieldset
            placeholder="Your Name"
            name="username"
            required
            value={username}
            handler={inputHandler}
          ></FormFieldset>

          <FormTextArea
            placeholder={"Short bio about you"}
            name={"bio"}
            value={bio}
            handler={inputHandler}
            className={"form-control-lg"}
          ></FormTextArea>

          <FormFieldset
            placeholder="Email"
            name="email"
            required
            value={email}
            handler={inputHandler}
          ></FormFieldset>

          <FormFieldset
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handler={inputHandler}
          ></FormFieldset>

          {successMessage && (
            <p className="settings-success-message" role="status">
              {successMessage}
            </p>
          )}

          <FormButton
            disabled={isSaving}
            text={isSaving ? "Updating Settings..." : "Update Settings"}
          ></FormButton>
        </fieldset>
      </form>
    )
  );
}

export default SettingsForm;
