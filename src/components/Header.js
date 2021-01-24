import Button from './Button.js'

const Header = (props) => {
    const {onAdd, visibleAdd} = props;
    return (
        <header className="header">
            <h1> Task Tracker </h1>
            <Button
             text={visibleAdd ? "Close" : "Add"}
             onClick={onAdd}
             color={ visibleAdd ? 'red'  : 'steelblue'} />                
        </header>
    )
}

export default Header
