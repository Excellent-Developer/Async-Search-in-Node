const API = require('./mock-api');
// To count the matches, call API.countMatches(term) where term is the search term
const EventEmitter = require('events')

class Search extends EventEmitter{
    searchCount(searchTerm){
        const obj = this
        if(searchTerm){
            this.emit('SEARCH_STARTED', searchTerm)
            if(searchTerm == 'error'){
                this.emit('SEARCH_ERROR', {term: searchTerm, message: 'CONNECTION_ERROR'})
            } else {
                API.countMatches(searchTerm).then(function(count){
                    console.log(count)
                    obj.emit('SEARCH_SUCCESS', {term: searchTerm, count: count})  
                })
            }
        } else {
            this.emit('SEARCH_ERROR', {term: searchTerm, message: 'INVALID_TERM'})
        }
    }
}

module.exports = Search