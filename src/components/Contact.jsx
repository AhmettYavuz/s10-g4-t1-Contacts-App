import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useContactDetails, useDeleteContact } from "../services/tanStack";

export default function Contact() {
  const { contactId } = useParams();
  const { isPending, error, data: contact } = useContactDetails(contactId);
  const history = useHistory();
  const deleteContactMutations = useDeleteContact();

  const handleDelete = () => {
    deleteContactMutations.mutate(contactId);
    history.push("/");
  };

  if (isPending) return "loading";

  if (error) return "Error occured !..";

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || null} />
      </div>

      <div>
        <h1 data-testid="full_name">
          {contact.first_name || contact.last_name ? (
            <>
              {contact.first_name} {contact.last_name}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
        </h1>

        {contact.email && (
          <p>
            <a target="_blank" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </p>
        )}

        {contact.description && <p>{contact.description}</p>}

        <div>
          <button className="delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
