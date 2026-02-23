import { useState } from "react";
import "./JobItem.css";

export function JobItem({ job, onApply }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    if (repoUrl === "") {
      setError("Ingrese el link a su repositorio en GitHub");
      return;
    }
    setError(null);
    onApply(job.id, repoUrl);
    setRepoUrl("");
  };

  return (
    <article className="job-item">
      <h4>{job.title}</h4>
      <input
        type="url"
        name="githubRepoUrl"
        placeholder="Url de tu repositorio en GitHub"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />
      <button type="button" onClick={handleSubmit}>
        Aplicar
      </button>
      {error ? <p className="error-text">{error}</p> : null}
    </article>
  );
}
