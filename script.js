function _$(elts){return document.getElementById(elts)}

let tour =_$("tour");

//fin du jeu
let fin = document.querySelector(".fin");
let vainqueur = document.querySelector(".fin p");

let plateau = document.querySelector(".plateau");

//pour chaque pion
let un = _$("premiere");
let deux = _$("deuxieme");
let trois = _$("troisieme");
let quatre = _$("quatrieme");
let cinq = _$("cinquieme");
let six = _$("sixieme");
let sept = _$("septieme");
let huit = _$("huitieme");
let neuf = _$("neuvieme");

//liste des id pour chaque pion
let tab_pion1 = [];
let tab_pion2 = [];

let places = [un,deux,trois,quatre,cinq,six,sept,huit,neuf];

let joueur1 = true; 

// mettre tous les pieces en un tableau
let pieces = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var nb_pions = 0; // max 6
var pos_curseur;

const img1 = "blanc.png";
const img2 = "noir.png";

let id_1 = null;
let id_2 = null;
let aligne = false;

// creation pion1
function piece_1(place){
    var myImage = new Image(25, 25);
    myImage.src = "image/blanc.png";
    place.appendChild(myImage);
}

// creation pion2
function piece_2(place){
    var myImage = new Image(25, 25);
    myImage.src = "image/noir.png";
    place.appendChild(myImage);
}


for(let i = 0; i < places.length; i++){
    let place = places[i];

    // verifie si c est aligne
    setInterval(() => {
        if(est_aligne(tab_pion1)){
            fin.classList.remove('debut');
            vainqueur.textContent = "Player 1 Win";
            plateau.classList.add("plateau_floute");
            pionsDesactive(places);
            aligne = true;   
        }else if(est_aligne(tab_pion2)){
            fin.classList.remove('debut');
            vainqueur.textContent = "Player 2 Win";
            plateau.classList.add("plateau_floute");
            pionsDesactive(places);
            aligne = true; 
        }
    }, 500);
    place.addEventListener('click', (e) => {

        if(!aligne){
            
            if(pos_curseur === undefined){
                pos_curseur = place.id;
            }
    
            if(nb_pions === 6){
                if(id_1 == null){
                    if(place.firstElementChild != null){
                        id_1 = place.id;
                    }   
                }else{
                    id_1 = pos_curseur;
                }
                if(place.id != pos_curseur){
                    supressionCurseur(places);
                    pos_curseur = place.id;
                }
    
    
                if(place.firstElementChild != null){
                    place.classList.toggle('choix');
                    id_2 = place.id;
                }else{
                    let valide = mouvementValide(pos_curseur, id_1);
                    let choix = obtenirPionChoisi(id_1, places);
                    let sourceTab = choix != null ? choix.src.split('/') : [];
           
                    // verifie si le mouvement est possible
                    if(valide){
                        if(joueur1){
                            if(sourceTab.includes(img1)){
                                
                                supressionChoixId(id_1, places, tab_pion1);
                                tab_pion1.push(place.id);
    
                                choix.parentNode.removeChild(choix);
                                piece_1(place);
                                
                                joueur1 = false;

                                supressionDernierMouvement(places);
        
                                place.classList.add("dernierMouvement");
                            }else{
                                alert("c'est pas ton tour")
                            }

                        }else{

                            if(sourceTab.includes(img2)){
                            
                                supressionChoixId(id_1, places, tab_pion2);
                                tab_pion2.push(place.id);

                                choix.parentNode.removeChild(choix);
                                piece_2(place);
                    
                                joueur1 = true;
        
                            
                                supressionDernierMouvement(places);
        
                        
                                place.classList.add("dernierMouvement");
                                
                            }else{
                                alert("c'est pas ton tour")
                            }
                        }
                    }else{
                        alert("pas de chemin");
                    }
                }
            }
            if(place.firstElementChild == null && nb_pions <= 5){

                if(joueur1){
                    piece_1(place);
                    tab_pion1.push(place.id);
                    joueur1 = false;
                }else{
                    piece_2(place);
                    tab_pion2.push(place.id);
                    joueur1 = true;
                }
                nb_pions++;
            }  

        }
    });
}


function supressionCurseur(tab){
    for(let j = 0; j < tab.length; j++){
        if(tab[j].classList.contains("choix")){
            tab[j].classList.remove("choix");
            break;
        }
    }
}

function obtenirPionChoisi(id, tab){
    for(let k = 0; k < tab.length; k++){
        if(tab[k].id === id){
            return tab[k].firstElementChild;
        }
    }
    return null;
}

function supressionChoixId(id, tab, tab_p){
    let piece = obtenirPionChoisi(id, tab);
    let place = piece.parentNode;
    for(let i = 0; i < tab_p.length; i++){
        if(tab_p[i] == place.id){
            tab_p.splice(i,1);
            break;
        }
    }
}

function supressionDernierMouvement(tab){
    for(let i = 0; i < tab.length; i ++){
        if(tab[i].classList.contains('dernierMouvement')){
            tab[i].classList.remove('dernierMouvement');
            break;
        }
    }
}

function mouvementValide(nouv_id, ancien_id) {
    switch(ancien_id){
        case "premiere":
            if(nouv_id === "deuxieme" || nouv_id === "quatrieme" || nouv_id === "cinquieme"){
                return true;
            }else{
                return false;
            }
        case "deuxieme":
            if(nouv_id === "premiere" || nouv_id === "troisieme" || nouv_id === "cinquieme"){
                return true;
            }else{
                return false;
            }
        case "troisieme":
            if(nouv_id === "deuxieme" || nouv_id === "sixieme" || nouv_id === "cinquieme"){
                return true;
            }else{
                return false;
            }
        case "quatrieme":
            if(nouv_id === "premiere" || nouv_id === "septieme" || nouv_id === "cinquieme"){
                return true;
            }else{
                return false;
            }
        case "sixieme":
            if(nouv_id === "troisieme" || nouv_id === "neuvieme" || nouv_id === "cinquieme"){
                return true;
            }else{
                return false;
            }
        case "septieme":
            if(nouv_id === "quatrieme" || nouv_id === "huitieme" || nouv_id === "cinquieme"){
                return true;
            }else{
                return false;
            }
        case "huitieme":
            if(nouv_id === "septieme" || nouv_id === "neuvieme" || nouv_id === "cinquieme"){
                return true;
            }else{
                return false;
            }
        case "neuvieme":
            if(nouv_id === "huitieme" || nouv_id === "sixieme" || nouv_id === "cinquieme"){
                return true;
            }else{
                return false;
            }
        
        case "cinquieme":
            return true;
        default:
            return false;
    }
}


function est_aligne(tab){
    if(tab.includes("premiere") && tab.includes("deuxieme") && tab.includes("troisieme")){
        return true;
    }
    if(tab.includes("premiere") && tab.includes("quatrieme") && tab.includes("septieme")){
        return true;
    }
    if(tab.includes("premiere") && tab.includes("cinquieme") && tab.includes("neuvieme")){
        return true;
    }
    if(tab.includes("troisieme") && tab.includes("sixieme") && tab.includes("neuvieme")){
        return true;
    }
    if(tab.includes("septieme") && tab.includes("huitieme") && tab.includes("neuvieme")){
        return true;
    }
    if(tab.includes("troisieme") && tab.includes("cinquieme") && tab.includes("septieme")){
        return true;
    }
    if(tab.includes("deuxieme") && tab.includes("cinquieme") && tab.includes("huitieme")){
        return true;
    }
    if(tab.includes("quatrieme") && tab.includes("cinquieme") && tab.includes("sixieme")){
        return true;
    }

}

function reinitilise(){
    setTimeout(() => {
        window.location.reload();
    }, 500);
    
}

function pionsDesactive(arr){
    for(let i = 0; i < arr.length; i++){
        arr[i].disabled = true;
    }
}
