const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
]; // Hér er array fyrir alla vegina í þorpinu, - merkin á milli tákna vegi

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];// array fyrir fyrirfram ákveðna leið sem róbotinn á að fara

function buildGraph(edges) {
  let graph = Object.create(null); // býr til tómann local object fyrir grafið
  function addEdge(from, to) { // fall sem tekur inn 2 staði (1 breytu úr array með - striki á milli)
    if (graph[from] == null) { // ef fyrri staðurinn er í listanum
      graph[from] = [to]; //þá verður fyrri staðurinn að þeim seinni
    } else { // ef fyrri staðurinn er ekki skilgreindur
      graph[from].push(to); // þá er seinni staðurinn settur í þann fyrri
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) { //for of lykkja sem tekur arrayið roads og skiptir þeim upp í from og to staði, sem verða svo brúnir í grafinu 
    addEdge(from, to);// setur veginn frá 1 til 2 í grafið
    addEdge(to, from);// setur veginn frá 2 til 1 í grafið
  }
  return graph;// skilar grafinu
}

const roadGraph = buildGraph(roads); // constant breyta roadGraph sem keyrir fallið buildGraph og sendir arrayið roads sem input

class VillageState {// klasi sem tekur inn 2 gildi í gegnum smið og setur í sjálfgerðann object
  constructor(place, parcels) {// byrjun á smið
    this.place = place;// setur fyrra gildið í objectinn
    this.parcels = parcels;// setur seinna gildið í objectinn
  }

  move(destination) {//smiður sem tekur inn áfangastað robots
    if (!roadGraph[this.place].includes(destination)) { //ef sá staður er ekki á kortinu þá skilar hann objectnum
      return this;
    } else { // ef hann er á kortinu
      let parcels = this.parcels.map(p => { 
        if (p.place != this.place) return p;//ef það robotinn er ekki á sama stað og pakkinn þá skilar hann parcels breytunni
        return {place: destination, address: p.address};// skila út áfangastað, núverandi stað og staðnum á pakkanum
      }).filter(p => p.place != p.address);//tökum ekki inn staði þar sem pakkinn er ekki
      return new VillageState(destination, parcels);// uppfærir village state þar sem búið er að sækja pakkann
    }
  }
}

function runRobot(state, robot, memory) {// fall fyrir robot þar sem beðið er um state (kortið af þorpinu), robot (hvaða robot á að nota eins og t.d. goalOrientedRobot) og memory sem verður tómur array til að byrja með
  for (let turn = 0;; turn++) {//for lykkja sem endar ekki nema pakkarnir séu búnir
    if (state.parcels.length == 0) {//ef pakkarnir eru búnir
      console.log(`Done in ${turn} turns`);//skrifa í console hversu lengi robotinn var að þessu
      break;//hætta í lykkju
    }
    let action = robot(state, memory);//temporary breyta fyrir það sem robotinn er að gera núna sem tekur inn kortið af þorpinu og minnið
    state = state.move(action.direction);// bæti hreyfingunni á robotinum í "kortið" 
    memory = action.memory;// uppfæri gildið á minninu
    console.log(`Moved to ${action.direction}`);//skrifa út hvert robotinn fór
  }
}

function randomPick(array) {//fall sem sér um að velja random gildi úr array
  let choice = Math.floor(Math.random() * array.length);//temp breyta fyrir val sem notar built in random functionið í javascript sem skilar gildi á milli 0 og 1 sem er svo margfaldað með lengdinni á arrayinu
  return array[choice];// skilar gildinu sem hefur index númerið af random gildinu
}

function randomRobot(state) {//random robot sem keyrir ekki eftir korti heldur velur bara einhvern stað til þess að fara á
  return {direction: randomPick(roadGraph[state.place])};// skila áttinni sem kemur úr randomPick fallinu
}

VillageState.random = function(parcelCount = 5) {// býr til nýtt þorp með random uppsetningu
  let parcels = [];// temp breyta sem er tómur array
  for (let i = 0; i < parcelCount; i++) {// for lykkja sem keyrir 1 sinni fyrir hvern pakka
    let address = randomPick(Object.keys(roadGraph));// fyrir pakkann er valið random heimilisfang úr þorpinu
    let place;// tóm breyta fyrir staðsetningu
    do {// do while lykkja sem keyrir á meðan staður og heimilisfang eru það sama
      place = randomPick(Object.keys(roadGraph));// velur annað heimilisfang fyrir place sem er áfangastaður pakkans
    } while (place == address);
    parcels.push({place, address});//bæti þessum pakka í arrayið
  }
  return new VillageState("Post Office", parcels); // skilar uppfærðu "korti" af þorpinu með pökkunum
};

function findRoute(graph, from, to) {// fall til þess að finna leiðina að næsta pakka, tekur inn veg kortið ásamt staðnum sem robotinn er á og staðnum sem hann er á leiðinni á
  let work = [{at: from, route: []}];//work verður array af objectum með at og route breytum
  for (let i = 0; i < work.length; i++) {//for lykkja sem keyrir x mörgum sinnum eftir því hversu mikið robotinn þarf að gera
    let {at, route} = work[i];//temp object fyrir array element úr work Arrayinu
    for (let place of graph[at]) {//for of lykkja sem keyrir fyrir staði í grafinu sem passa við núverandi staðsetningu robotsinns
      if (place == to) return route.concat(place);//ef staðurinn passar við áfangastað robotsinns
      if (!work.some(w => w.at == place)) {// ef robotinn á ekki eftir að gera neitt á þessum stað 
        work.push({at: place, route: route.concat(place)});// uppfæri work arrayið með object
      }
    }
  }
}

function goalOrientedRobot({place, parcels}, route) {//fall fyrir robot sem fylgir leiðbeiningum
  if (route.length == 0) {//ef fyrirfram ákveðna leiðin er tóm
    let parcel = parcels[0];//velur fyrsta pakkann
    if (parcel.place != place) {//ef staðurinn sem fyrsti pakkinn er á er ekki sami staður og robotinn er á
      route = findRoute(roadGraph, place, parcel.place);//finnur hann auðveldustu leiðina eftir kortinu að pakkanum
    } else {
      route = findRoute(roadGraph, place, parcel.address);//finnur auðveldustu leiðina að heimilisfanginu
    }
  }
  return {direction: route[0], memory: route.slice(1)};//skilar  object með leiðinni og bút af minninu
}

runRobot(VillageState.random(), goalOrientedRobot, []);//keyrir fallið runRobot með skilirðunum random þorp, markmiðaður robot og tómum array