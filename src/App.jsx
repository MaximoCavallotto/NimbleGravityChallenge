import { useState, useEffect } from "react";
import { CandidateProfile } from "./components/CandidateProfile";
import { JobItem } from "./components/JobItem";
import "./App.css";

const BASE_URL =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

function App() {
  const [candidate, setCandidate] = useState(null);
  const [searchError, setSearchError] = useState(null);

  const [jobsList, setJobsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [jobsError, setJobsError] = useState(null);

  const searchCandidate = (email) => {
    setCandidate(null);
    setSearchError(null);

    fetch(BASE_URL + "/api/candidate/get-by-email?email=" + email)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al buscar el usuario");
        }
        return response.json();
      })
      .then((data) => {
        setCandidate(data);
      })
      .catch(() => {
        setSearchError("No se encontró un candidato con ese email");
      });
  };

  const applyToJob = (jobId, repourl) => {
    if (!candidate) {
      alert("Ingresa tu mail en la búsqueda antes de aplicar");
      return;
    }

    const payload = {
      uuid: candidate.uuid,
      jobId: jobId,
      candidateId: candidate.candidateId,
      repoUrl: repourl,
    };

    fetch("endpoint post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Falló la postulación");
        }
        alert("Postulación exitosa!");
      })
      .catch(() => {
        alert("Hubo un error al enviar la postulación");
      });
  };

  useEffect(() => {
    fetch(BASE_URL + "/api/jobs/get-list")
      .then((response) => response.json())
      .then((data) => {
        setJobsList(data);
        setIsLoading(false);
      })
      .catch(() => {
        setJobsError("Hubo un problema al cargar los trabajos.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <h2>Cargando posiciones...</h2>;
  }

  if (jobsError) {
    return <h2>{jobsError}</h2>;
  }

  return (
    <div className="app-container">
      <CandidateProfile
        candidate={candidate}
        onSearch={searchCandidate}
        error={searchError}
      />
      <h3>Listado de trabajos: </h3>
      {jobsList.map((job) => (
        <JobItem key={job.id} job={job} onApply={applyToJob} />
      ))}
    </div>
  );
}
export default App;
