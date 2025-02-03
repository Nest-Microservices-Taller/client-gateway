import { Type } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

export class PaginationDto {
    @IsNumber()
    @Type(() => Number)
    @Min(1)
    @IsOptional()
    page?: number = 1;

    @IsNumber()
    @Type(() => Number)
    @Min(1)
    @IsOptional()
    limit?: number = 10;
}