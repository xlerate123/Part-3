const Filter = ({same, filterName}) => {
    return(  
    <div>Filter shown with <input value={same} onChange={filterName}/></div>
    )
    }

export default Filter    