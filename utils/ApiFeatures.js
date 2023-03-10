class ApiFeatures{


    constructor(query,querystr){

         this.query = query;
         this.querystr = querystr
    }
 
    pagination(resultPerPage){
        
        var  skip =  resultPerPage*(this.querystr.page-1);
     
        this.query = this.query.limit(resultPerPage).skip(skip)
    //    console.log(this.query + 'hi');
        return this;
       
    }
}

module.exports = ApiFeatures;