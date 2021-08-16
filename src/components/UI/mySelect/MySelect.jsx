import s from './MySelect.module.css'

export const MySelect = ({ defaultValue, options, value, onChange }) => {
    return (
        <select className={s.mySelect}
            defaultValue={defaultValue}
            onChange={(e) => onChange(e.target.value)}
        >
            <option disabled>{defaultValue}</option>
            {options.map(option =>
                <option value={option.value} key={option.value}>
                    {option.name}
                </option>)}
        </select>
    )
}