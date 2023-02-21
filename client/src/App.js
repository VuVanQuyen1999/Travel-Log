import React, { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";

import { listLogEntries } from "./Api";

const App = () => {
    const [logEntries, setLogEntries] = useState([]);
    useEffect(() => {
        (async () => {
            const logEntriesRes = await listLogEntries();
            setLogEntries(logEntriesRes);
        })();
    }, []);
    return (
        <Map
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
                longitude: -95.665,
                latitude: 37.6,
                zoom: 3,
            }}
            style={{ width: "100vw", height: "100vh" }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        >
            {logEntries.map((entry) => {
                return (
                    <Marker
                        key={entry._id}
                        longitude={entry.longitude}
                        latitude={entry.latitude}
                        anchor="bottom"
                    >
                        <img src="https://www.clipartmax.com/png/small/300-3004129_map-pin-map-pins-vector.png" />
                        <div style={{ color: "red" }}>{entry.title}</div>
                    </Marker>
                );
            })}
        </Map>
    );
};

export default App;
