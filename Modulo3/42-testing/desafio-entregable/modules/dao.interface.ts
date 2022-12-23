export interface DAOInterface <Type, IdType>{
    getAll();
    getById(id: IdType);
    save(object: Type);
    update(id: IdType, object:Type);
    delete(id: IdType)
}