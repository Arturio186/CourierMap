const CheckObjectProperties = (target : object, properties : Array<string>) : boolean => {
    return properties.every(property => target.hasOwnProperty(property));
} 

export default CheckObjectProperties;