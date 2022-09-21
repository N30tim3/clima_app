import React from "react";

const useLocalStorage = (key = "localStorage", initValue = "") => {
    const [storedValue, setStoredValue] = React.useState(() => {
        try {
            const retrieved = localStorage.getItem(key);
            return retrieved ? JSON.parse(retrieved) : initValue;
        } catch (error) {
            console.log(error);
            return initValue;
        }
    });

    const setLocalStorage = (value) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setLocalStorage];
};

export default useLocalStorage;