// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import {useEffect, useState} from "react";

import styles from "./Form.module.css";
import Button from "./Button.jsx";
import BackButton from "./BackButton.jsx";
import {useUrlPosition} from "../hooks/useUrlPosition.js";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";

export function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

function Form() {
    const [lat, lng] = useUrlPosition();

    const [cityName, setCityName] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [country, setCountry] = useState("");
    const [emoji, setEmoji] = useState("");
    const [geocodingError, setGeocodingError] = useState("");

    useEffect(() => {
        async function fetchCityData() {
            try {
                setIsLoading(true);
                setGeocodingError("");
                const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
                const data = await res.json();
                console.log(data);
                if (!data.countryCode) throw new Error("That doesn't seem to be a city 🤔")
                setCityName(data.city || data.locality || "")
                setCountry(data.countryName);
                setEmoji(convertToEmoji(data.countryCode))
            } catch (err) {
                setGeocodingError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCityData();
    }, [lat, lng])

    if (isLoading) return <Spinner/>;

    if (geocodingError) return <Message message={geocodingError}/>;

    return (
        <form className={styles.form}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                {<span className={styles.flag}>{emoji}</span>}
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <input
                    id="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type='primary'>Add</Button>
                <BackButton/>
            </div>
        </form>
    );
}

export default Form;
