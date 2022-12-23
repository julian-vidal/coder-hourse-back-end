export interface ProductDTO {
    id: number,
    name: string,
    price: number,
    stock: number,
    picture: string,
    _id?: string
}

export interface CreateProductDTO extends Omit<ProductDTO, "_id"> {}

export interface UpdateProduct extends Partial<CreateProductDTO> {}

export interface UpdateProductDTO extends Omit<UpdateProduct, "id"> {}