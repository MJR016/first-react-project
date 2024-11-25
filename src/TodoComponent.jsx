import { useState } from "react";
import './TodoComponent.css'
import removeIcon from "./assets/image1.png"
import updateIcon from "./assets/image2.png"

export default function TodoComponent(){

    const [work, setWork] = useState("");
    const [workList, setWorkList] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false)
    const [valueToUpdate, setValueToUpdate] = useState();
    const [replaceWork, setReplaceWork] = useState("");
    const [disableAddButton, setDisableAddButton] = useState(false);
    let isBlue = true;
    let isOrange = false;

    function addWork(){
        if(work.trim().length != 0){
            setWorkList((w)=> [...w, work.trim()]);
            setWork(()=> "");
        } else {
            setWork(()=> "");
        }

    }

    function removeWork(index){
        const removedWorkList = workList.filter((_element, index1)=>  index1 != index);
        setWorkList(()=> removedWorkList);
    }

    function altBgColor(index){
        if (index % 3 == 0) {
            return {backgroundColor: "blue"};
        } else if (index % 3 == 1) {
            return {backgroundColor: "orange"};
        } else {    
            return {backgroundColor: "violet"};
        }
    }

    function updateWorkDisplay(index){
        setIsUpdate(()=> true);
        setDisableAddButton(()=> true);
        setValueToUpdate(()=> index);
    }

    function updateWork(){
        const updateWorkList = workList.map((_element, index1)=> {if (index1 != valueToUpdate) {
            return _element;
            
        } else {
            if(replaceWork.trim().length != 0){
              return replaceWork;  
            } else {
                return _element;
            }
            
        }});

        setWorkList(()=> updateWorkList);
        setIsUpdate(()=> false);
        setReplaceWork(()=> "");
        setDisableAddButton(()=> false);

    }

    function displayWork(){
        if (!isUpdate) {
        return workList.map((job, index)=> {
        return <div key={index} className="notes-div" style={altBgColor(index)}> <p>{job}</p> 
        <button onClick={()=> removeWork(index)} className="notes-button" style={altBgColor(index)}><img src={removeIcon} alt="remove-image" /></button> 
        <button onClick={()=> updateWorkDisplay(index)} className="notes-button" style={altBgColor(index)}><img src={updateIcon} alt="update-image" /></button>  </div>
        }) 
        } else {
            return <>
            <br />
        <div>
            <input value={replaceWork} onChange={(e)=> setReplaceWork(e.target.value)} className="main-input-2" type="text" />
            <button onClick={()=> updateWork()} className="main-button-2">Update</button>
        </div>
            </>
            
        }
    }


    return (<>
     <div className="main-div">
        <h1>What's the Plan for Today?</h1>
        <div>
            <input value={work} onChange={(e)=> setWork(e.target.value)} className="main-input" type="text" disabled = {disableAddButton}/>
            <button onClick={()=> addWork()} className="main-button" disabled = {disableAddButton}>Add Todo</button>
        </div>
        <div>
        {displayWork()}
        </div>
     </div>
    </>)
}