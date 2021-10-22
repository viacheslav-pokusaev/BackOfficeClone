export interface RestInterface<T,Q>{ 
    
    getById(id:number);

    get(model:Q);

    create(model:T);

    update(model:T);

    delete(id:number);
}