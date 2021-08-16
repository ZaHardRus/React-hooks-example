import s from './MyButton.module.css'

export const MyButton = ({children, ...props}) => {
    return(
        <button className={s.MyButton} {...props}>
            {children}
        </button>
    )
}