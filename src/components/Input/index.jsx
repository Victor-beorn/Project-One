import "./styles.css";

export const TextInput = ({handleChange, searchValue}) => {
    return (
        <input className="input" onChange={handleChange} value={searchValue} type="search" placeholder="🔍 Pesquise" />
)};


