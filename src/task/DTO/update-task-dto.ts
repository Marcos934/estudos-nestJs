import { IsOptional } from "class-validator";

export class UpdateTaskDto {
   @IsOptional()
   readonly name?: string;

   @IsOptional()
   readonly description?: string;

   @IsOptional()
   readonly completed?: boolean;
}
