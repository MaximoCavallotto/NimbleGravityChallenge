import { useState } from "react";
import "./CandidateProfile.css";

export function CandidateProfile({ candidate, onSearch, error }) {
  const [candidateEmail, setCandidateEmail] = useState("");

  const handleSubmit = () => {
    if (candidateEmail === "") {
      alert("Debe ingresar un candidato para buscar");
      return;
    }
    onSearch(candidateEmail);
  };

  return (
    <article className="candidate-container">
      <h2>Buscador de candidato</h2>
      <div className="candidate-searcher">
        <input
          type="email"
          placeholder="Ingresá tu email para buscar"
          value={candidateEmail}
          onChange={(e) => setCandidateEmail(e.target.value)}
        />

        <button type="button" onClick={handleSubmit}>
          Buscar Candidato
        </button>
      </div>
      {error != null ? <p className="error-text">{error}</p> : null}

      <h3>
        {candidate?.firstName} {candidate?.lastName}
      </h3>

      <div className="candidate-details">
        <label htmlFor="candidateuuid">UUID: </label>
        <input
          type="text"
          id="candidateuuid"
          disabled
          value={candidate?.uuid || ""}
        />

        <label htmlFor="candidateId">Id de candidato: </label>
        <input
          type="text"
          id="candidateId"
          disabled
          value={candidate?.candidateId || ""}
        />

        <label htmlFor="applicationId">Id de aplicacion: </label>
        <input
          type="text"
          id="applicationId"
          disabled
          value={candidate?.applicationId || ""}
        />

        <label htmlFor="firstName">Nombre: </label>
        <input
          type="text"
          id="firstName"
          disabled
          value={candidate?.firstName || ""}
        />

        <label htmlFor="lastName">Apellido: </label>
        <input
          type="text"
          id="lastName"
          disabled
          value={candidate?.lastName || ""}
        />
      </div>
    </article>
  );
}
