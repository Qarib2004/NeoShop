import { ICatalog } from "./catalog.interface";






export function Catalog({title,description,linkTitle,link,products}:ICatalog){
    return <div className="wrapper">
        <div className="header">
            <div className="info">
                <h1>{title}</h1>
                {description && <p>{description}</p>}
            </div>
            
        </div>
    </div>
}