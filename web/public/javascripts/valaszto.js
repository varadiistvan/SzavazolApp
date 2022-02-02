let keruletek
let currentKerulet = null
let editing = []

function redraw () {
    console.log(currentKerulet)
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
    const jeloltDiv = document.getElementById("jeloltDiv" + idstr)

    editing.push(idstr)

    const nev = document.getElementById("jeloltNev" + idstr)
    const nevinput = document.createElement("input")
    nevinput.id = "nevinput" + idstr
    nevinput.defaultValue = nev.textContent
    jeloltDiv.replaceChild(nevinput, nev)
    const nevsign = document.createElement("span")
    nevsign.innerHTML = "Név: "
    insertBefore(nevsign, document.getElementById("nevinput" + idstr))
    insertAfter(document.createElement("br"),document.getElementById("nevinput" + idstr))

    const part = document.getElementById("part" + idstr)
    const partinput = document.createElement("input")
    partinput.id = "partinput" + idstr
    partinput.defaultValue = part.textContent
    jeloltDiv.replaceChild(partinput, part)
    const partsign = document.createElement("span")
    partsign.innerHTML = "Párt: "
    insertBefore(partsign, document.getElementById("partinput" + idstr))
    insertAfter(document.createElement("br"),document.getElementById("partinput" + idstr))

    const kep = document.getElementById("kep" + idstr)
    const kepinput = document.createElement("input")
    kepinput.id = "kepinput" + idstr
    kepinput.defaultValue = kep.src.replace(window.location.origin + "/images/jeloltek/", "")
    jeloltDiv.replaceChild(kepinput, kep)
    const kepsign = document.createElement("span")
    kepsign.innerHTML = "Kép fájlneve: "
    insertBefore(kepsign, document.getElementById("kepinput" + idstr))

    const program = document.getElementById("program" + idstr)
    const programinput = document.createElement("input")
    programinput.id = "programinput" + idstr
    programinput.defaultValue = program.href
    programinput.size = 50
    jeloltDiv.replaceChild(programinput, program)
    const programsign = document.createElement("span")
    programsign.innerHTML = "Program: "
    insertBefore(programsign, document.getElementById("programinput" + idstr))

    const editbtn = document.getElementById("editbtn" + idstr)
    const savebtn = document.createElement("button")
    savebtn.innerHTML = "Mentés"
    savebtn.addEventListener("click", () => {saveEdit(ids)})
    editbtn.replaceWith(savebtn)

    const deletebtn = document.getElementById("deletebtn" + idstr)
    const cancelbtn = document.createElement("button")
    cancelbtn.innerHTML = "Mégse"
    cancelbtn.addEventListener("click", () => {cancelEdit(ids)})
    deletebtn.replaceWith(cancelbtn)
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
    jelolt.part = document.getElementById("partinput" + idstr).value
    jelolt.kep = document.getElementById("kepinput" + idstr).value
    jelolt.program = document.getElementById("programinput" + idstr).value
    editing = editing.filter((value, index, arr) => {
        return value != idstr
    })
    console.log("jeloltek", jeloltek)
    console.log("editing", editing)
    drawJeloltek(document.getElementById("kerInfo" + ids[0]))
}

function drawJeloltek(kerInfo) {
    for (let jelolt of keruletek[currentKerulet].jeloltek) {
        const ids = [currentKerulet, jelolt.id]
        const idstr = ids[0] + "_" + ids[1]
        if(!(editing.includes(idstr))){

            try{
                kerInfo.removeChild(document.getElementById("jeloltDiv" + idstr))
            }
            catch(error){}

            const jeloltDiv = document.createElement("div")
            jeloltDiv.classList.add("jeloltDiv")
            jeloltDiv.id = "jeloltDiv" + idstr

            const nev = document.createElement("h4")
            nev.innerHTML = jelolt.nev
            nev.id = "jeloltNev" + idstr
            jeloltDiv.appendChild(nev)
            
            const part = document.createElement("h5")
            part.innerHTML = jelolt.part
            part.id = "part" + idstr
            jeloltDiv.appendChild(part)
            
            const kep = document.createElement("img")
            kep.src = "../images/jeloltek/" + jelolt.kep
            kep.id = "kep" + idstr
            jeloltDiv.appendChild(kep)
        
            const program = document.createElement("a")
            program.innerHTML = jelolt.program
            program.href = jelolt.program
            program.id = "program" + idstr
            program.target = "_blank"
            jeloltDiv.appendChild(document.createElement("br"))
            jeloltDiv.appendChild(program)
            jeloltDiv.appendChild(document.createElement("br"))
            
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
    let a = current ? null : key
    let b = current ? key : null
    currentKerulet = a
    clicksSetup()
    document.getElementById("keruletNev"+key).replaceWith(document.getElementById("keruletNev"+key).cloneNode(true))
    redraw()
    document.getElementById("keruletNev"+key).addEventListener("click", () => {clickKer(key,!current)})
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