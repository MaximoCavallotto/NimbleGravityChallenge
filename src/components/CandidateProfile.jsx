import { useState } from "react";

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
    <article>
      <h2>Buscador de candidato</h2>
      <input
        type="email"
        placeholder="Ingresá tu email para buscar"
        value={candidateEmail}
        onChange={(e) => setCandidateEmail(e.target.value)}
      />

      <button type="button" onClick={handleSubmit}>
        Buscar Candidato
      </button>

      {error != null ? <p className="error-text">{error}</p> : null}

      <h3>
        {candidate?.firstName} {candidate?.lastName}
      </h3>

      <div>
        <label htmlFor="candidateuuid">UUID: </label>
        <input
          type="text"
          id="candidateuuid"
          readOnly
          value={candidate?.uuid || ""}
        />

        <label htmlFor="candidateId">Id de candidato: </label>
        <input
          type="text"
          id="candidateId"
          readOnly
          value={candidate?.candidateId || ""}
        />

        <label htmlFor="applicationId">Id de aplicacion: </label>
        <input
          type="text"
          id="applicationId"
          readOnly
          value={candidate?.applicationId || ""}
        />

        <label htmlFor="firstName">Nombre: </label>
        <input
          type="text"
          id="firstName"
          readOnly
          value={candidate?.firstName || ""}
        />

        <label htmlFor="lastName">Apellido: </label>
        <input
          type="text"
          id="lastName"
          readOnly
          value={candidate?.lastName || ""}
        />
      </div>
    </article>
  );
}
