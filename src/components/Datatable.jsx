import './Datatable.css'
import { useEffect, useCallback } from "react";
import { useRef } from "react";
import { useState } from "react";
import useFetch from "../hooks/useFetch";

function Datatable() {

    const [list, setList] = useState([]);
    const [page, setPage] = useState(0);
    const [show, setShow] = useState(false)

    const { loading, error, data, reFetch} = useFetch(page);

    const loader = useRef(null);

    const handleObserver = useCallback((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        handleChange();
      }
    }, []);

    useEffect(() => {
      const option = {
        root: null,
        rootMargin: "20px",
        threshold: 0
      };
      const observer = new IntersectionObserver(handleObserver, option);
      if (loader.current) {
        observer.observe(loader.current);
      } 
    }, [handleObserver]);

    // when ever new data is fetched then we concat with prev data
    useEffect(()=>{
      setList((prev) =>[ ...new Set([...prev, ...data])]);
    }, [data])

    function handleChange() {
        setPage((prev)=>(prev+1))
    }

    const handleClick = () => {
      setShow(true)
      //setPage(1);
    }

    return(
        <div className="datatable-container">
            { (!show) ?  <button onClick={handleClick}>Click to Fetch</button> : <></>}
            {
              (show) ? <div className="datatable-lists" >
                        {list.map((item, i)=>(
                          <div className="datatable-items" key={i}>
                            <div>{item.userId}</div>
                            <div className='item-id'>{item.id}</div>
                            <div className='item-title'>{item.title}</div>
                          </div>
                        ))}  
                        
                      </div> : <></>
            } 
            <div ref={loader}></div>
        </div>
    );
}

export default Datatable;