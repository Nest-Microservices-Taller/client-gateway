import { Type } from "class-transformer";
import { IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {

    @IsString({message: 'El nombre es requerido y debe ser un string'})
    public name: string;

    @IsString({message: 'La descripción es requerida y debe ser un string'})
    public description: string;

    @IsNumber({
        maxDecimalPlaces: 4
    })
    @Type(() => Number)
    @Min(0)
    public price: number;

    @IsNumber()
    @Type(() => Number)
    @Min(0)
    public stock: number;
}
