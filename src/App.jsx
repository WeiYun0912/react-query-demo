import { useState } from "react";
import { useQuery } from "react-query";
import "./App.css";

// https://pokeapi.api-docs.io/v2.0/pokemon/hmdqEKsagkj6Pu5ct

const timeToDate = (time) => {
  let t = new Date(time);
  return t.toLocaleString();
};

const fetchPokeAPI = async ({ queryKey }) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${queryKey[1]}/`);
  const data = await res.json();
  return data;
};

function App() {
  const [dexId, setDexId] = useState(1);
  const {
    data,
    isSuccess,
    isError,
    dataUpdatedAt,
    error,
    isLoading,
    isIdle,
    refetch,
  } = useQuery(["PokeAPI", dexId, "Hello", "World"], fetchPokeAPI, {
    enabled: false,
  });

  console.log("isSuccess", isSuccess);

  console.log("isError", isError);

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isIdle) {
    return (
      <>
        <button onClick={() => refetch()}>Fetch</button>
        <h1>Not Ready...</h1>
      </>
    );
  }

  return (
    <div className="box">
      <h3>Data Updated At: {timeToDate(dataUpdatedAt)}</h3>
      <div>
        <button onClick={() => setDexId((prev) => prev - 1)}>Prev</button>
        <button onClick={() => setDexId((prev) => prev + 1)}>Next</button>
      </div>
      <div>
        <div className="card">
          <p className="dexId">
            No.00{data.id} {data.name}
          </p>
          <img src={data?.sprites?.front_default} />
          <div className="typeflex">
            {data?.types?.map((type) => (
              <div className={`types ${type.type.name}`} key={type.type.name}>
                <span className="mt-1">{type.type.name.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
