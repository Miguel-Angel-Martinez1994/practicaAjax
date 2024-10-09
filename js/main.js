document.addEventListener("DOMContentLoaded",()=>{

const url="https://jsonplaceholder.typicode.com/posts";

const body= document.querySelector("body");
const tabla=document.querySelector("#tabla");


document.addEventListener("click",(ev)=>{
    if(ev.target.matches(`button`)){
        pintarDescripcion(ev.target.id);
    }
})

const conexion =async(item)=>{
    console.log(item);
    console.log(url+"/"+item);
    try{
       
        const res= await fetch(url);
        const resCon=await fetch(`${url}/${item}`);
        //console.log(resCon);
        
        if(res.ok){
            const data=await res.json();
            if(resCon.ok){
                const dataCon=await resCon.json();
                return dataCon;
            }
            return data;
        }else{
            throw(new Error(`muestra no encontrada`));
        }
 
    }catch(error){
       throw(error);
    }

}

const pintarTabla=async ()=>{
    try{
        const res= await conexion(url);
        console.log({res});

        res.forEach(({id, title})=>{
            tabla.innerHTML +=
            `<td>${id}</td>
            <td>${title}</td>
            <td><button id="${id}">Leer mas</button></td>
            <td>&nbsp;</td>
            `
        })
       
    }catch(error){
         body.innerHTML=`
        <p>${error.message}</p>`
    }
}

const pintarDescripcion= async (item)=>{
try {
    const res= await conexion(item);
    const {body}=res

    tabla.innerHTML+=`
    ${body}`
} catch (error) {
   console.log(error); 
}
}

pintarTabla();
})//LOAD