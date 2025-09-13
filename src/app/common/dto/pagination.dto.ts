


import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export class PaginationDto {
    @IsInt()
    @IsOptional()
    @Min(0)
    // @Max(10)
    @Type(() => Number)
    offset?: number;

    @IsInt()
    @IsOptional()
    @Min(0)
    // @Max(10)
    @Type(() => Number)   
    limit?: number;
}
