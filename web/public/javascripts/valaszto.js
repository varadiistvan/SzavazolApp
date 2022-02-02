let keruletek
let currentKerulet = null
let editing = []

function redraw () {
    let kerInfo = document.createElement("div")
    kerInfo.id = "kerInfo" + currentKerulet
    let addbtn = document.createElement("button")
    addbtn.innerHTML = "Jelölt hozzáadása"
    kerInfo.appendChild(addbtn)
    if(currentKerulet){
        drawJeloltek(kerInfo)
    }
}

function removeJelolt(ids) {
    const idstr = ids[0] + "_" + ids[1]
    if(confirm("Biztosan eltávolítod a " + document.getElementById("jeloltNev" + idstr).textContent + " nevű jelöltet?")){
        console.log(idstr)
    }
} 

function editJelolt(ids) {
    const idstr = ids[0] + "_" + ids[1]
    editing.push(idstr)

    for (let type of ["nevsign", "nevinput", "partsign", "partinput", "kepsign", "kepinput", "programsign", "programinput", "savebtn", "cancelbtn"]){
        const item = document.getElementById(type + idstr)
        item.classList.remove("hidden")
    }
    for (let type of ["jeloltNev", "part", "kep", "program", "editbtn", "deletebtn"]){
        const item = document.getElementById(type + idstr)
        item.classList.add("hidden")
    }
} 

function saveEdit(ids){
    const idstr = ids[0] + "_" + ids[1]
    const jeloltek = keruletek[ids[0]]["jeloltek"]
    let jelolt
    for (let i of jeloltek){
        if(i.id == ids[1]){
            jelolt = i
            break
        }
    }
    jelolt.nev = document.getElementById("nevinput" + idstr).value
    document.getElementById("jeloltNev" + idstr).innerHTML = jelolt.nev
    jelolt.part = document.getElementById("partinput" + idstr).value
    document.getElementById("part" + idstr).innerHTML = jelolt.part
    jelolt.kep = document.getElementById("kepinput" + idstr).value
    document.getElementById("kep" + idstr).src = "../images/jeloltek/" + jelolt.kep
    jelolt.program = document.getElementById("programinput" + idstr).value
    const program = document.getElementById("program" + idstr)
    program.href = jelolt.program
    program.innerHTML = jelolt.program

    cancelEdit(idstr)
}

function cancelEdit (idstr){
    editing = editing.filter((value, index, arr) => {
        return value != idstr
    })
    
    for (let type of ["nevsign", "nevinput", "partsign", "partinput", "kepsign", "kepinput", "programsign", "programinput", "savebtn", "cancelbtn"]){
        const item = document.getElementById(type + idstr)
        item.classList.add("hidden")
    }
    for (let type of ["jeloltNev", "part", "kep", "program", "editbtn", "deletebtn"]){
        const item = document.getElementById(type + idstr)
        item.classList.remove("hidden")
    }
}



function drawJeloltek(kerInfo) {
    for (let jelolt of keruletek[currentKerulet].jeloltek) {
        const ids = [currentKerulet, jelolt.id]
        const idstr = ids[0] + "_" + ids[1]
        if(!(editing.includes(idstr))){
            const jeloltDiv = document.createElement("div")
            jeloltDiv.classList.add("jeloltDiv")
            jeloltDiv.id = "jeloltDiv" + idstr

            const nev = document.createElement("h4")
            nev.innerHTML = jelolt.nev
            nev.id = "jeloltNev" + idstr
            const nevinput = document.createElement("input")
            nevinput.id = "nevinput" + idstr
            nevinput.defaultValue = jelolt.nev
            const nevsign = document.createElement("span")
            nevsign.id = "nevsign" + idstr
            nevsign.innerHTML = "Név: "
            jeloltDiv.appendChild(nev)
            jeloltDiv.appendChild(nevsign)
            jeloltDiv.appendChild(nevinput)
            
            const part = document.createElement("h5")
            part.innerHTML = jelolt.part
            part.id = "part" + idstr
            const partinput = document.createElement("input")
            partinput.id = "partinput" + idstr
            partinput.defaultValue = jelolt.part
            const partsign = document.createElement("span")
            partsign.id = "partsign" + idstr
            partsign.innerHTML = "Párt: "
            jeloltDiv.appendChild(part)
            jeloltDiv.appendChild(partsign)
            jeloltDiv.appendChild(partinput)

            
            const kep = document.createElement("img")
            kep.src = "../images/jeloltek/" + jelolt.kep
            kep.id = "kep" + idstr
            const kepinput = document.createElement("input")
            kepinput.id = "kepinput" + idstr
            kepinput.defaultValue = jelolt.kep
            const kepsign = document.createElement("span")
            kepsign.id = "kepsign" + idstr
            kepsign.innerHTML = "Kép fájlneve: "
            jeloltDiv.appendChild(kep)
            jeloltDiv.appendChild(kepsign)
            jeloltDiv.appendChild(kepinput)
        
            const program = document.createElement("a")
            program.innerHTML = jelolt.program
            program.href = jelolt.program
            program.id = "program" + idstr
            program.target = "_blank"
            const programinput = document.createElement("input")
            programinput.id = "programinput" + idstr
            programinput.defaultValue = jelolt.program
            programinput.size = 50
            const programsign = document.createElement("span")
            programsign.id = "programsign" + idstr
            programsign.innerHTML = "Program: "    
            jeloltDiv.appendChild(program)
            jeloltDiv.appendChild(programsign)
            jeloltDiv.appendChild(programinput)
            
            const editbtn = document.createElement("button")
            editbtn.innerHTML = "Jelölt szerkesztése"
            editbtn.id = "editbtn" + idstr
            editbtn.addEventListener("click", () => {editJelolt(ids)})
            jeloltDiv.appendChild(editbtn)
            
            const deletebtn = document.createElement("button")
            deletebtn.innerHTML = "Jelölt törlése"
            deletebtn.id = "deletebtn" + idstr
            deletebtn.addEventListener("click", () => {removeJelolt(ids)})
            jeloltDiv.appendChild(deletebtn)

            const savebtn = document.createElement("button")
            savebtn.innerHTML = "Mentés"
            savebtn.id = "savebtn" + idstr
            savebtn.addEventListener("click", () => {saveEdit(ids)})
            jeloltDiv.appendChild(savebtn)

            const cancelbtn = document.createElement("button")
            cancelbtn.innerHTML = "Mégse"
            cancelbtn.id = "cancelbtn" + idstr
            cancelbtn.addEventListener("click", () => {cancelEdit(idstr)})
            jeloltDiv.appendChild(cancelbtn)
            
            for (let item of [nevsign, nevinput, partsign, partinput, kepsign, kepinput, programsign, programinput, savebtn, cancelbtn]){
                item.classList.add("hidden")
            }
            
            kerInfo.appendChild(jeloltDiv)
        
        }
    }
    insertAfter(kerInfo, document.getElementById("keruletNev" + currentKerulet))
}

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

function insertBefore(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode);
}

function removeNext(node){
    node.parentNode.removeChild(node.nextSibling)
}

function clickKer (key, current) {
    console.log(editing)
    if(editing.length != 0){
        alert("Előbb fejezd be a jelenlegi szerkesztéseket!")
    }
    else{
        let a = current ? null : key
        let b = current ? key : null
        currentKerulet = a
        clicksSetup()
        document.getElementById("keruletNev"+key).replaceWith(document.getElementById("keruletNev"+key).cloneNode(true))
        redraw()
        document.getElementById("keruletNev"+key).addEventListener("click", () => {clickKer(key,!current)})
    }
}

function removeChilds (parent) {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};

function clicksSetup () {
    removeChilds(document.getElementById("eddigiKeruletek"))
    for(let key in keruletek){
        const kerulet = document.createElement("h3")
        kerulet.innerHTML =  keruletek[key].keruletNev
        kerulet.id = "keruletNev"+key
        kerulet.addEventListener("click", ()=>clickKer(key,false))
        const kerdiv = document.createElement("div")
        kerdiv.id = "ker" + key
        kerdiv.classList.add("kerdiv")
        kerdiv.appendChild(kerulet)
        document.getElementById("eddigiKeruletek").appendChild(kerdiv)
    }
}

await fetch(window.location.origin + "/data/valaszto").then(res => res.json()).then(obj => {keruletek = obj})

clicksSetup()