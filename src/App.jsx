import { useState } from "react";
import { CandidateProfile } from "./components/CandidateProfile";

const BASE_URL =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

function App() {
  const [candidate, setCandidate] = useState(null);
  const [searchError, setSearchError] = useState(null);

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
  return (
    <>
      <CandidateProfile
        candidate={candidate}
        onSearch={searchCandidate}
        error={searchError}
      />
    </>
  );
}
export default App;
