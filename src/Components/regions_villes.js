module.exports ={
   loadCities:function(state) {
    const newState
    fetch(`https://geo.api.gouv.fr/communes?codeRegion=${this.state.region_code}&fields=nom,codeRegion,region&format=json`)
      .then(result => result.json())
      .then(regionVilles => newState={ ...state, regionVilles: regionVilles, filteredVilles: regionVilles });
    return newState
  }
}
 