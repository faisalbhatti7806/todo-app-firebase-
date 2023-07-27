import { db } from "./firebase.mjs";
import { collection, addDoc, getDocs , doc , deleteDoc , updateDoc , onSnapshot  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const btn = document.getElementById("btn");
btn.addEventListener("click", async () => {
  const inp = document.getElementById("inp").value;
  try {
    const docRef = await addDoc(collection(db, "todo"), {
      inp: inp,
    });
    // location.reload();
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

// if (change.type === "added") {
//     console.log("New city: ", change.doc.data());
// }
// if (change.type === "modified") {
//     console.log("Modified city: ", change.doc.data());
// }
// if (change.type === "removed") {
//     console.log("Removed city: ", change.doc.data());
// }

 function add(){
    const todo = document.getElementById("todo")
    const q = (collection(db, "todo"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "removed") {
         let dltdiv = document.getElementById(change.doc.id)
            dltdiv.remove()
            console.log( change.doc.data());
            }else if(change.type==="added"){
                
                console.log(change);
               todo.innerHTML+=`
               
               <div id="${change.doc.id}">
               <h1>${change.doc.data().inp}</h1>
             <div>
                <button onclick="edit('${change.doc.id}')">edit</button>
                <button onclick="delet('${change.doc.id}')">delete</button>
             </div>
             </div>
               `
            }

      });
    });
 }

add()

// const add= async()=>{
//     const querySnapshot = await getDocs(collection(db, "todo"));
//     querySnapshot.forEach((doc) => {
// todo.innerHTML+=`
// <h1>${doc.data().inp}</h1>
// <div>
//     <button onclick="edit('${doc.id}')">edit</button>
//     <button onclick="delet('${doc.id}')">delete</button>
// </div>`
//       console.log(doc.data());
//     });
    
// }
// add();


const delet=(async(id)=>{
console.log(id);
    await deleteDoc(doc(db, "todo", id));
})



const edit = (async(id)=>{
    const washingtonRef = doc(db, "todo", id);
    var arr = prompt("enter value");

    await updateDoc(washingtonRef, {
      inp: arr
    });
    // location.reload();
    
})

window.edit=edit;
window.delet=delet;