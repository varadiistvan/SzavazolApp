let keruletek
let currentKerulet = null

function redraw () {
    console.log(currentKerulet)
    let kerInfo = document.createElement("div")
    let addbtn = document.createElement("button")
    addbtn.innerHTML = "Jelölt hozzáadása"
    kerInfo.appendChild(addbtn)
    if(currentKerulet){
        for(let jelolt of keruletek[currentKerulet].jeloltek){
            let jeloltDiv = document.createElement("div")
            let nev = document.createElement("h4")
            nev.innerHTML = jelolt.nev
            jeloltDiv.appendChild(nev)
            let part = document.createElement("h5")
            part.innerHTML = jelolt.part
            jeloltDiv.appendChild(part)
            let kep = document.createElement("img")
            kep.src = "../images/jeloltek/" + jelolt.kep
            jeloltDiv.appendChild(kep)
            let program = document.createElement("p")
            program.innerHTML = "Program: " + jelolt.program
            jeloltDiv.appendChild(program)
            let programbtn = document.createElement("button")
            programbtn.innerHTML = "Megnyitás"
            programbtn.addEventListener("click", ()=>{
                window.open(jelolt.program, "_blank")
            })
            jeloltDiv.appendChild(programbtn)
            kerInfo.appendChild(jeloltDiv)
        }
        insertAfter(kerInfo, document.getElementById("keruletNev" + currentKerulet))
    }
}

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
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
        document.getElementById("eddigiKeruletek").appendChild(kerulet)
    }
}

await fetch(window.location.origin + "/data/valaszto").then(res => res.json()).then(obj => {keruletek = obj})

clicksSetup()