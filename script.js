let calculActuel = '0';
let calculPrecedent = '';
let operation = null;

function mettreAJourEcran(){
    document.getElementById('calcul-actuel').textContent = calculActuel;
    document.getElementById('calcul-precedent').textContent = calculPrecedent;
}

function ajouterNombre(nombre) {
    if (nombre == '.'&& calculActuel.includes('.'))return;
    if (calculActuel == '0' && nombre != '.'){
        calculActuel = nombre;
    }else {
        calculActuel += nombre;
    }
    mettreAJourEcran();
}

function ajouterOperateur(op) {
    if (operation != null){
        calculer();
    }
    operation = op;
    calculPrecedent = calculActuel + ' ' + op;
    calculActuel = '0';
    mettreAJourEcran();
}

function calculer(){
    if (operation == null) return;
    let resultat;
    const precedent = parseFloat(calculPrecedent);
    const actuel = parseFloat(calculActuel);

    if (isNaN(precedent) || isNaN(actuel))return;
    switch(operation){
        case '+':
            resultat = precedent + actuel;
            break;
        case '-':
            resultat = precedent - actuel;
            break;
        case '*':
            resultat = precedent * actuel;
            break;
        case '/':
            resultat = precedent / actuel;
            break;
        case '%':
            resultat = precedent % actuel;
            break;
        default:
            return;
    }
    calculActuel = resultat.toString();
    operation = null;
    calculPrecedent = '';
    mettreAJourEcran();
}

function effacerTout() {
    calculActuel = '0';
    calculPrecedent = '';
    operation = null;
    mettreAJourEcran(); 
}

function effacer(){
    if(calculActuel.length > 1) {
        calculActuel = calculActuel.slice(0,-1);
    }else{
        calculActuel = '0';
    }
    mettreAJourEcran();
}

document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9' || event.key == '.'){
        ajouterNombre(event.key);
    }else if(event.key == '+' || event.key == '-' || event.key == '*' || event.key == '/'){
        ajouterOperateur(event.key);
    }else if (event.key == 'Enter' || event.key == '='){
        calculer();
    }else if (event.key == 'Backspace'){
        effacer();
    }else if (event.key == 'Escape'){
        effacerTout();
    }
});